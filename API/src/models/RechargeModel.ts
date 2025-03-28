import { Timestamp } from "mongodb";
import mongoose, { CallbackError } from "mongoose";

interface IRecharge {
    date: Date;
    start_hour: Timestamp;
    end_hour: Timestamp;
    total: Number;
  }
  
  interface IRechargeMethods {
  }
  
  type RechargeModel = mongoose.Model<IRecharge, {}, IRechargeMethods>;

  const RechargeSchema = new mongoose.Schema<IRecharge, RechargeModel, IRechargeMethods>({
	date: {
		type: Date,
		require: true,
	},
	start_hour: {
		type: Date,
		require: true,
	},
	end_hour: {
		type: Date,
        required: true
	},
    total: {
        type: Number
    }
});

const Recharge = mongoose.model("Recharge", RechargeSchema);

export { Recharge };
