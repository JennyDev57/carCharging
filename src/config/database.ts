// Import the mongoose module
import mongoose from "mongoose";


async function connectToDatabase() {
	try {
		const mongoDB = process.env.MONGO_URL as string;
		console.log(mongoDB);
		await mongoose.connect(mongoDB, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		});
  
	  	console.log('Successfully connected to MongoDB');
	} catch (error) {
	  	console.error('Error connecting to MongoDB:', error);
	}
  }

module.exports = connectToDatabase;


// const database = {};
// database.connect = async () => {
// 	// Set up default mongoose connection
// 	const mongoDB = process.env.MONGO_URL || null;
// 	console.log(mongoDB);

// 	await mongoose.connect(mongoDB, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});

// 	// Get the default connection
// 	var db = mongoose.connection;

// 	//Bind connection to error event (to get notification of connection errors)
// 	// eslint-disable-next-line no-console
// 	db.on("error", console.error.bind(console, "MongoDB connection error:"));
//     db.on("connection", console.log.bind("MongoDB connection successfull"));
	
// 	database.db = db;

// 	//     /**
// 	//  * Import MongoClient & connexion à la DB
// 	//  */
// 	//     const MongoClient = require('mongodb').MongoClient;
// 	//     const url = 'mongodb://localhost:27017';
// 	//     const dbName = 'parkingApi';
// 	//     let db
// 	//     MongoClient.connect(url, function(err, client) {
// 	//     console.log("Connected successfully to MongoDB Server");
// 	//     db = client.db(dbName);
// 	//     database.db = db
// 	//     });
// };

// // module.exports = database;
