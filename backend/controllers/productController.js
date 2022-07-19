import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// GET get /api/products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products);
})

//  GET get /api/product/:id
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'product not found' })
    }
})
export { getProducts, getProductById }