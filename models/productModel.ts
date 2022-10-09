import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
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
            email: { type: String, required: false },
        },
        bookedOn: { type: String, required: false },
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', ProductSchema);

export default Product

