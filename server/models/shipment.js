const mongoose = require("mongoose");


const shipmentSchema = new mongoose.Schema(
  {
    
    origin: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
   requests :[
        {
            type :mongoose.Schema.Types.ObjectId,
            ref : "bookShipment"
        }
   ],
    status: {
      type: String,
      enum: ["pending", "dispatched", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to a user with role: 'Driver'
    },
   
    // warehouse: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Warehouse",
    // },
    deliveryDate: Date,
    // actualDeliveryDate: Date,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
   
  },
  { timestamps: true }
);

const Shipment = mongoose.model("Shipment", shipmentSchema);
module.exports = Shipment;
