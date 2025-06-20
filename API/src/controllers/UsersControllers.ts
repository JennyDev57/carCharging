import mongoose from "mongoose";
import { ErrorApiResponse, SuccessApiResponse } from "../config/ApiResponses.ts";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../config/Authentification.ts";
import { Users } from "../models/UsersModel.ts";
import jwt from "jsonwebtoken";
const ObjectID = mongoose.Types.ObjectId;

export default class UsersControllers {

	public register = async (req: any, res: any) => {
		const data = req.body;
		try {
			const userExist = await Users.findOne({ email: data.email });
			if (userExist) {
				throw new Error("Email already exist");
			}

			let user = new Users({
				email: data.email,
				password: data.password,
				role: "USER",
			});
			await user.save();

			res.status(201).send(SuccessApiResponse(user));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public login = async (req: any, res: any) => {
		const email = req.body.email;
		const password = req.body.password;

		try {
			const user = await Users.findOne({ email: email });
			if(!user) {
				throw new Error(`No user found with email: ${email}`)
			}
			let isMatch = user && user.checkPassword(password);

			if (!isMatch) {
				throw new Error("Password not match");
			}
			const token = generateAccessToken(user.toJSON());
			const refreshToken = generateRefreshToken(user.toJSON());

			res.header("Authorization", token);
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "strict",
			});
			res.status(201).send(SuccessApiResponse({ token: token }));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};

	public getUser = async (req: any, res: any) => {
		res.status(201).send(SuccessApiResponse(req.user));
	};

	// public refreshToken = async (req: any, res: any) => {
	// 	const refreshToken = req.cookies.refreshToken;

	// 	try {
	// 		if (!refreshToken) {
	// 			return res.sendStatus(401);
	// 		}

	// 		jwt.verify(
	// 			refreshToken,
	// 			String(process.env.REFRESH_TOKEN_SECRET),
	// 			(err: any, user: any) => {
	// 				if (err) {
	// 					return res.sendStatus(401);
	// 				}

	// 				// TODO: Check en base que l'user est toujours existant/autorisé à utiliser la plateforme
	// 				delete user.iat;
	// 				delete user.exp;
	// 				const accessToken = generateAccessToken(user);
	// 				res.header("Authorization", accessToken);
	// 				res.status(201).send(
	// 					SuccessApiResponse({ token: accessToken })
	// 				);
	// 			}
	// 		);
	// 	} catch (error) {
	// 		res.status(500).send(ErrorApiResponse(error));
	// 	}
	// };

	public getUserList = async (req: any, res: any) => {
		try {
			const userList = await Users.find({});

			res.send(SuccessApiResponse(userList));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	}

	public deleteUser = async ( req: any, res: any ) => {
		const id = req.user._id;

		try {
			if (!ObjectID.isValid(id)) {
				return res.status(400).send(SuccessApiResponse(`No record with given id: ${id}`));
			}
			const result = await Users.findByIdAndDelete(id);

			res.status(201).send(SuccessApiResponse(result));
		} catch (error) {
			res.status(500).send(ErrorApiResponse(error));
		}
	};
	
}
