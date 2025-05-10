const mongoose = require('mongoose');

const bookShipmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
    },
    senderName: {
      type: String,
      required: true,
    },
    senderPhone: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "dispatched", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    packageWeight: {
      type: Number,
      required: true,
    },
    packageType: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const bookShipment = mongoose.model("bookShipment", bookShipmentSchema);
module.exports = bookShipment;
