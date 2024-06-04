import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "products",
        }
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed", "Processing", "Shipped", "Out Of Delivery", "Delivered", "Return", "Cancel"],
    },
}, {timestamps: true});

export default mongoose.model('orders', orderSchema);