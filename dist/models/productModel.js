"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    availability: { type: Boolean, required: true },
    needing_repair: { type: Boolean, required: false },
    durability: { type: Number, required: false },
    max_durability: { type: Number, required: false },
    price: { type: Number, required: true },
    discount_rate: { type: Number, required: false },
    mileage: { type: Number, required: false },
    minimum_rent_period: { type: Number, required: false },
    bookingPeriod: {
        start: { type: String, required: false },
        end: { type: String, required: false },
    },
    bookedBy: {
        name: { type: String, required: false },
        userId: { type: String, required: false },
    },
    bookedOn: { type: String, required: false },
}, {
    timestamps: true
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
