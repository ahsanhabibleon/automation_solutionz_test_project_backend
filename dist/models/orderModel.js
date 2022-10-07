"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    orderedItems: [
        {
            slug: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
        }
    ],
    shippingAddress: {
        name: { type: String, required: true },
        // address: { type: String, required: true },
        district: { type: String, required: true },
        division: { type: String, required: true },
        post_code: { type: String, required: true },
        phone: { type: String, required: true },
        street: { type: String, required: true },
        prefix: { type: String, required: true },
        country_of_residence: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    itemsPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
});
const Order = mongoose_1.default.model('Order', OrderSchema);
exports.default = Order;
