"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const utils_1 = require("../utils");
const orderRoutes = express_1.default.Router();
orderRoutes.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const newOrder = new orderModel_1.default({
        orderedItems: req.body.orderedItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id }))),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        shippingPrice: req.body.shippingPrice,
        itemsPrice: req.body.itemsPrice,
        totalPrice: req.body.totalPrice,
        taxPrice: req.body.taxPrice,
        // @ts-ignore
        user: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id
    });
    const order = yield newOrder.save();
    res.status(201).send({ message: 'New order created.', order });
})));
orderRoutes.get('/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findById(req.params.id);
    if (order) {
        res.send(order);
    }
    else {
        res.status(404).send({ messege: 'Order not found!' });
    }
})));
exports.default = orderRoutes;
