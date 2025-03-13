import { now } from "mongoose";
import { Recharge } from "../models/RechargeModel";
import { differenceInHours, differenceInMinutes, isBefore, millisecondsToHours, minutesToHours } from "date-fns";

export default class RechargeControllers {

    start_HC: Date = new Date();
    end_HC: Date = new Date();
    start_HP: Date = new Date();
    end_HP: Date = new Date();

    KWh: number;
    HP: number;
    HC: number
    TVA: number;

    constructor() {

        this.KWh = 1.8;
        this.HP = 0.1249;
        this.HC = 0.0872;
        this.TVA = 1.20;

        this.start_HC.setHours(23);
        this.start_HC.setMinutes(10);
        this.end_HC.setHours(7);
        this.end_HC.setMinutes(10);

        this.start_HP.setHours(7);
        this.start_HP.setMinutes(10);
        this.end_HP.setHours(23);
        this.end_HP.setMinutes(10);
      }

    public get = async (req: any, res: any) => {
    }

    public add = async (req: any, res: any) => {
        const data = req.body;
        try {
            const startH = data.startDate;
            const endH = data.endDate;
            console.log(startH, endH);
            stop();

            // ------------------------             
            
            // this.start_HC.setDate(startH.getDate() + 1);
            // this.end_HC.setDate(startH.getDate() + 1);
            // this.start_HP.setDate(startH.getDate() + 1);

            // this.end_HP.setDate(startH.getDate());
            // this.start_HC.setDate(startH.getDate());
            

            // const isHCreuse = isBefore(this.start_HC, startH);
            // const isHPleine = isBefore(this.start_HP, startH);
            // console.log('isHeureCreuse', isHCreuse, 'isHPleine', isHPleine);
                
                
            // Calcul Heure Pleines
            const d1 =  differenceInMinutes(this.end_HP,startH);
            let calc1 = (d1/60) * this.KWh * this.HP * this.TVA;
            const res1: number = Math.sign(calc1) < 0 ? 0 : calc1;
            console.log(this.end_HP,startH, res1);
            
            // Calcul Heure Creuses
            let d2 = 0;
            if( res1 == 0) {
                d2 = differenceInMinutes(this.end_HC, startH);
            } else {
                d2 = differenceInMinutes(this.end_HC, this.start_HC);
            }
            const res2 = (d2/60) * this.KWh * this.HC * this.TVA;
            console.log(this.end_HC, this.start_HC, startH, d2, res2);

            // Calcul Heure Creuses
            const d3 = differenceInMinutes(endH, this.start_HP);
            const res3 = (d3/60) * this.KWh * this.HP * this.TVA;
            console.log(endH, this.start_HP, res3);

            console.log('Total:', (res1+res2+res3).toFixed(3));



            // let recharge = new Recharge({
            //     date: new Date(),
            //     start_hour: startH.getTime(),
            //     end_hour: endH.getTime(),
            // });
			// await recharge.save();
            
        } catch (error) {
            
        }
    }

}