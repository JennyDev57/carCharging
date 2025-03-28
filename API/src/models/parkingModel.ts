import mongoose from "mongoose";

let ParkingSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
  },
});


const Parkings = mongoose.model('Parkings', ParkingSchema);

export { Parkings } ;