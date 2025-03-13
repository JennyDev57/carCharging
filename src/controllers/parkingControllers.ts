import { ErrorApiResponse, SuccessApiResponse } from "../config/ApiResponses";
import { Parkings } from "../models/parkingModel";
import mongoose, { Error } from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export default class parkingControllers {
	public getParkingsList = async (req: any, res: any) => {
		try {
			const parkingList = await Parkings.find({});

			res.send(SuccessApiResponse(parkingList));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public getParkingById = async (req: any, res: any) => {
		const id = req.params.id;
		try {
			const parking = await Parkings.findOne({ id: id });
			res.send(SuccessApiResponse(parking));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public insertParking = async (req: any, res: any) => {
		const item = req.body;
		try {
			const newP = new Parkings(item);
			await newP.save();

			res.status(201).send(SuccessApiResponse(newP));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public updateParking = async ( req: any, res: any ) => {
		const id = req.params.id;

		try {
			if (!ObjectID.isValid(id)) {
				return res.status(400).send(ErrorApiResponse(`No record with given id: ${id}`));
			}

			const item = req.body;
			const result = await Parkings.findByIdAndUpdate(id, item, {
				new: true,
			});

			res.status(201).send(SuccessApiResponse(result));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public deleteParking = async ( req: any, res: any ) => {
		const id = req.params.id;

		try {
			if (!ObjectID.isValid(id)) {
				return res.status(400).send(SuccessApiResponse(`No record with given id: ${id}`));
			}
			const result = await Parkings.findByIdAndDelete(id);

			res.status(201).send(SuccessApiResponse(result));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};
}
