import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

import { MongoClient } from 'mongodb';
const mongoDB = process.env.MONGO_URL as string;
const client = new MongoClient(mongoDB, { monitorCommands: true });
const db = client.db();
 
export const auth = betterAuth({
    database: mongodbAdapter(db),
    trustedOrigins: ["http://localhost:5000", "http://localhost:4321"],
    user: {
        modelName: "user",
    },
    session: {
        modelName: "user_sessions",
    },
    account: {
        modelName: "user_account",
    },
    verification: {
        modelName: "user_verification",
    },
    emailAndPassword: {  
        enabled: true
    }
});