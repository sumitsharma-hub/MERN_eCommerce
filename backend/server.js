import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/d.js';
import productRoutes from './Routes/productRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import orderRoutes from './Routes/orderRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDb();
app.get('/', (req, res) => {
    res.send('this is sumit sharma');
})
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, (() => {
    console.log(`server is running on ${PORT}`);
}))