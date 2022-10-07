import express from 'express';
import Product from '../models/productModel';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

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