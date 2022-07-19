import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Row,
    Col,
    Image,
    ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/ErrorMessage";
import Loader from '../components/Loader'
import { getOrderDetails } from "../actions/orderAction";



const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const dispatch = useDispatch();


    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.ShippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 100);
        order.TaxPrice = addDecimals(Number((.15 * order.itemsPrice).toFixed(2)))
        order.TotalPrice = Number(order.itemsPrice) + Number(order.ShippingPrice) + Number(order.TaxPrice)
    }

    useEffect(() => {
        dispatch(getOrderDetails(orderId));
        // eslint-disable-next-line
    }, [])


    console.log(order);

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>ORDER {orderId}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup.Item variant="flush">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong> {order.user.name}
                            <a href={`mailTo:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city}
                            {order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>order is empty</Message>
                        ) : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = $ {item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping Charge</Col>
                                <Col>${order.ShippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.TaxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.TotalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Col>
            </Row>
        </>

};

export default OrderScreen;
