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
const productModel_1 = __importDefault(require("../models/productModel"));
const productRouter = express_1.default.Router();
productRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find();
    res.send(products);
}));
productRouter.get('/slug/:slug', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ status: 404, message: 'Product Not Found' });
    }
}));
productRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ status: 404, message: 'Product Not Found' });
    }
}));
productRouter.post('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    productModel_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, result) {
        if (err) {
            res.status(404).send({ status: 404, message: 'Product Not Found' });
        }
        res.status(200).send(result);
    });
}));
exports.default = productRouter;
