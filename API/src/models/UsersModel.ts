import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Roles = {
	ADMIN: "ADMIN",
	USER: "USER",
} as const;
type Roles = (typeof Roles )[keyof typeof Roles ];

const SALT_ROUND = 10;

interface IUser {
  email: string;
  password: string;
  role: Roles;
}

interface IUsersMethods {
  setPassword(password: string): string;
  checkPassword(password: string): string;
}

type UsersModel = mongoose.Model<IUser, {}, IUsersMethods>;

const UsersSchema = new mongoose.Schema<IUser, UsersModel, IUsersMethods>({
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	role: {
		type: String,
		enum: Roles,
	},
});

UsersSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password =  bcrypt.hashSync(String(this.password), SALT_ROUND);
	}
	next();
});


UsersSchema.method('setPassword', function setPassword(password: string) {
  this.password = bcrypt.hashSync(password, SALT_ROUND);
});

UsersSchema.method('checkPassword', function checkPassword(password: string) {
  return bcrypt.compareSync(String(password), String(this.password));
});

const Users = mongoose.model("Users", UsersSchema);

export { Users };
