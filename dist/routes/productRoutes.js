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
const productModel_1 = __importDefault(require("../models/productModel"));
const productRouter = express_1.default.Router();
const PAGE_SIZE = 10;
productRouter.get('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const type = query.category || '';
    const price = (query === null || query === void 0 ? void 0 : query.price) || '';
    const searchQuery = query.query || '';
    const queryFilter = searchQuery && searchQuery !== 'all'
        ? {
            name: {
                $regex: searchQuery,
                $options: 'i',
            },
        }
        : {};
    const categoryFilter = type && type !== 'all' ? { type } : {};
    const priceFilter = price && price !== 'all'
        ? {
            // 1-50
            price: {
                $gte: Number(price.split('-')[0]),
                $lte: Number(price.split('-')[1]),
            },
        }
        : {};
    const products = yield productModel_1.default.find(Object.assign(Object.assign(Object.assign({}, queryFilter), categoryFilter), priceFilter))
        .skip(pageSize * (page - 1))
        .limit(pageSize);
    const countProducts = yield productModel_1.default.countDocuments(Object.assign(Object.assign(Object.assign({}, queryFilter), categoryFilter), priceFilter));
    res.send({
        products,
        countProducts,
        page,
        pageSize,
        pages: Math.ceil(countProducts / pageSize),
    });
})));
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
