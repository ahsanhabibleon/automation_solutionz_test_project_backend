import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';

const productRouter = express.Router();
const PAGE_SIZE = 10;

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const query: any = req.query;
        const pageSize: number = query.pageSize || PAGE_SIZE;
        const page: number = query.page || 1;
        const type: string = query.category || '';
        const price: any = query?.price || '';
        const searchQuery: string = query.query || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
        const categoryFilter = type && type !== 'all' ? { type } : {};

        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
        })
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
        });
        res.send({
            products,
            countProducts,
            page,
            pageSize,
            pages: Math.ceil(countProducts / pageSize),
        });
    })
);

productRouter.get('/slug/:slug', async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ status: 404, message: 'Product Not Found' });
    }
});

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ status: 404, message: 'Product Not Found' });
    }
});

productRouter.post('/update/:id', async (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function (err, result) {
        if (err) {
            res.status(404).send({ status: 404, message: 'Product Not Found' });
        }
        res.status(200).send(result);
    });

});

export default productRouter