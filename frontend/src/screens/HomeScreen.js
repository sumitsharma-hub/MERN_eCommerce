import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
// import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
const HomeScreen = () => {
    const dispatch = useDispatch();
    const Product_list = useSelector(state => state.Product_list)
    const { loading, error, products } = Product_list;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            <h1>Latest products</h1>
            {loading ? <Loader /> : error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> :
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} xs={12} md={6} lg={4} xl={3}  >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default HomeScreen
