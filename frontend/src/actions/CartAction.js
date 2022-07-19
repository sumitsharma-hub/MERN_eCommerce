import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
} from "../constants/CartConstants";

const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    console.log(getState().cart);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        },
    });
    //console.log(getState().cart);

    localStorage.setItem("CartItems", JSON.stringify(getState().cart.cartItems));
};
const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
    localStorage.setItem("CartItems", JSON.stringify(getState().cart.cartItems));
};
const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};
const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_PAYMENT_METHOD,
        payload: data,
    });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
