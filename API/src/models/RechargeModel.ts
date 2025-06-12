import { Timestamp } from "mongodb";
import mongoose, { CallbackError } from "mongoose";

interface IRecharge {
    date: Date;
    start_hour: Timestamp;
    end_hour: Timestamp;
    total_cost: Number;
  }
  
  interface IRechargeMethods {
  }
  
  type RechargeModel = mongoose.Model<IRecharge, {}, IRechargeMethods>;

  const RechargeSchema = new mongoose.Schema<IRecharge, RechargeModel, IRechargeMethods>({
	start_hour: {
		type: Date,
		require: true,
	},
	end_hour: {
		type: Date,
        required: true,
	},
    total_cost: {
        type: Number,
        required: true,
    }
});

const Recharge = mongoose.model("Recharge", RechargeSchema);

export { Recharge };
