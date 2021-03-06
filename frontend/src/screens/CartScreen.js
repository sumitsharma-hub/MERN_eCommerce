import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    Button,
    FormControl,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/CartAction.js";

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    console.log(cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);


    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your Cart is Empty <Link to="/"> Go back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} fluid rouded></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <FormControl
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(item.product, Number(e.target.value))
                                                )
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((q) => (
                                                <option key={q + 1} value={q + 1}>
                                                    {q + 1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        ><i className="fas fa-trash"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SubTotal({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To CheckOut</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};

export default CartScreen;
