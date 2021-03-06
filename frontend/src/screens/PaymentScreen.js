import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { savePaymentMethod } from "../actions/CartAction";

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) {
        history.push("/shipping");
    }
    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legent">Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check
                        type="radio"
                        label="PayPal or Credit Card"
                        id="Paypal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    {/* <Form.Check
                        type="radio"
                        label="Stripe"
                        id="Stripe"
                        name="PaymentMethod"
                        value="Stripe"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check> */}
                </Col>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
