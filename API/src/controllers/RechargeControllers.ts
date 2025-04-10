import { now } from "mongoose";
import { Recharge } from "../models/RechargeModel";
import { differenceInHours, differenceInMinutes, isBefore, millisecondsToHours, minutesToHours } from "date-fns";
import { SuccessApiResponse } from "../config/ApiResponses";


type Result = {
    offPeakHour: {
        minutes: number,
        hours: number,
    },
    fullHour: {
        minutes: number,
        hours: number,
    }
}

export default class RechargeControllers {

    KWh: number;
    HP: number;
    HC: number
    TVA: number;

    constructor() {
        this.KWh = 1.8;
        this.HP = 0.1249;
        this.HC = 0.0872;
        this.TVA = 1.20;
    }

    private isOffPeakHour(date: Date): boolean {
        const hour = date.getHours();
        const minutes = date.getMinutes();
        
        return (hour === 23 && minutes >= 10) ||
                (hour < 7) ||
                (hour === 7 && minutes <= 10);
    }
      
    private getPeakAndOffPeakDurations(startDate: Date, endDate: Date): Result {
        const oneMinute = 60 * 1000;
        let current = new Date(startDate.getTime());
        let offPeakMinutes = 0;
        let peakMinutes = 0;
        
        while (current < endDate) {
            const isOffPeak = this.isOffPeakHour(current);
            if (isOffPeak) {
                offPeakMinutes++;
            } else {
                peakMinutes++;
            }
            current = new Date(current.getTime() + oneMinute);
        }
        
        return {
            offPeakHour: {
                minutes: offPeakMinutes,
                hours: +(offPeakMinutes / 60).toFixed(2),
            },
            fullHour: {
                minutes: peakMinutes,
                hours: +(peakMinutes / 60).toFixed(2),
            }
        };
    }

    private caculTotal(hours: Result): number {
        const totalHC = hours.offPeakHour.hours * this.KWh * this.HC * this.TVA;
        const totalHP = hours.fullHour.hours * this.KWh * this.HP * this.TVA;

        return totalHC + totalHP;
    }
      

    public get = async (req: any, res: any) => {
    }

    public add = async (req: any, res: any) => {
        const data = req.body;
        try {
            const start = new Date(data.start_date);
            const end = new Date(data.end_date);

    
            const offPeakHour = this.getPeakAndOffPeakDurations(start, end);
            
            let recharge = new Recharge({
                start_hour: start.getTime(),
                end_hour: end.getTime(),
            });
			await recharge.save();
            
            const total = this.caculTotal(offPeakHour)
            res.status(201).send(SuccessApiResponse(total));

            
        } catch (error) {
            
        }
    }

}