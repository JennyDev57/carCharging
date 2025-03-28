import mongoose, { CallbackError } from "mongoose";
import bcrypt from "bcrypt";

enum Roles {
	ADMIN = "ADMIN",
	USER = "USER",
}

const SALT_ROUND = 10;

interface IUser {
  email: string;
  password: string;
  role: Roles;
}

interface IUserMethods {
  setPassword(password: string): string;
  checkPassword(password: string): string;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
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

UserSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password =  bcrypt.hashSync(String(this.password), SALT_ROUND);
	}
	next();
});


UserSchema.method('setPassword', function setPassword(password: string) {
  this.password = bcrypt.hashSync(password, SALT_ROUND);
});

UserSchema.method('checkPassword', function checkPassword(password: string) {
  return bcrypt.compareSync(String(password), String(this.password));
});

const User = mongoose.model("User", UserSchema);

export { User };
