import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/UserModel";
import jwt, { JwtPayload } from "jsonwebtoken";

function generateAccessToken(user: object, expire: number = 1800) {
	console.log(user)
	
	// return jwt.sign(user, String(process.env.TOKEN_SECRET))

	return jwt.sign(user, String(process.env.TOKEN_SECRET), {
		expiresIn: expire,
	});
}

function authenticateToken(req: any, res: any, next: any) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	const refreshToken = req.cookies.refreshToken;

	if (!token) {
		res.status(401).send("Access Denied. No token provided.");
	}

	try {
		const decoded = jwt.verify(token, String(process.env.TOKEN_SECRET));
		req.user = new User(decoded);
		next();
	} catch (error) {
		console.log("Create a new access token with the refresh token");
		if (!refreshToken) {
			res.status(401).send("Access Denied. No refresh token provided.");
		}

		try {
			const decodeRefreshToken = jwt.verify(
				refreshToken,
				String(process.env.REFRESH_TOKEN_SECRET)
			) as JwtPayload;

			delete decodeRefreshToken.iat;
			delete decodeRefreshToken.exp;
			const accessToken = generateAccessToken(decodeRefreshToken, 60);

			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				sameSite: "strict",
			})
				.header("Authorization", accessToken)
				.send(decodeRefreshToken);
			req.user = new User(decodeRefreshToken);
			next();
		} catch (error) {
			res.status(401).send("Invalid Token : " + error);
		}
	}
}

function generateRefreshToken(user: any) {
	return jwt.sign(user, String(process.env.REFRESH_TOKEN_SECRET), {
		expiresIn: "1y",
	});
}

export { generateAccessToken, authenticateToken, generateRefreshToken };
