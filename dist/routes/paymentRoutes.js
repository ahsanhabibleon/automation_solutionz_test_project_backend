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
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const uuid_1 = __importDefault(require("uuid"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
    typescript: true,
});
const paymentRoutes = express_1.default.Router();
paymentRoutes.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    console.log({ body: req.body.order.shippingAddress });
    const newPayment = new paymentModel_1.default({
        id: (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.order) === null || _b === void 0 ? void 0 : _b._id,
        name: ((_e = (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.order) === null || _d === void 0 ? void 0 : _d.shippingAddress) === null || _e === void 0 ? void 0 : _e.name) || '',
        phone: ((_h = (_g = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.order) === null || _g === void 0 ? void 0 : _g.shippingAddress) === null || _h === void 0 ? void 0 : _h.phone) || '',
        email: ((_l = (_k = (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.order) === null || _k === void 0 ? void 0 : _k.shippingAddress) === null || _l === void 0 ? void 0 : _l.email) || '',
        address: ((_p = (_o = (_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.order) === null || _o === void 0 ? void 0 : _o.shippingAddress) === null || _p === void 0 ? void 0 : _p.address) || '',
        price: ((_r = (_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.order) === null || _r === void 0 ? void 0 : _r.totalPrice) || '',
        country: ((_u = (_t = (_s = req === null || req === void 0 ? void 0 : req.body) === null || _s === void 0 ? void 0 : _s.order) === null || _t === void 0 ? void 0 : _t.shippingAddress) === null || _u === void 0 ? void 0 : _u.country_of_residence) || '',
    });
    const payment = yield newPayment.save();
    // res.status(201).send({ message: 'New payment created.', payment })
    return stripe.customers.create({
        email: payment.email,
        source: payment.id
    }).then((customer) => {
        stripe.charges.create({
            amount: payment.price,
            currency: 'usd',
            customer: payment.id,
            receipt_email: payment.email
        }, { idempotencyKey: (0, uuid_1.default)() });
    }).then((result) => res.status(201).send({ message: 'New payment created.', result }));
})));
exports.default = paymentRoutes;
