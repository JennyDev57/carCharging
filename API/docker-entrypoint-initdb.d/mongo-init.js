db = db.getSiblingDB('carChargingAPI')

// db.getSiblingDB('admin').auth(
//     process.env.MONGO_INITDB_ROOT_USERNAME,
//     process.env.MONGO_INITDB_ROOT_PASSWORD
// );

db.createUser(
    {
        user: process.env.MONGO_USER,
        pwd: process.env.MONGO_PASSWORD,
        roles: [
            {
                role: "readWrite",
                db: process.env.MONGO_DB
            }
        ]
    }
);

db.createCollection('users');


// Auth Better database
db.createCollection('user');
db.createCollection('user_session');
db.createCollection('user_account');
db.createCollection('user_verification');
