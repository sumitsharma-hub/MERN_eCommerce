import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { ProductView } from "../actions/ProductScreenAction";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { FormControl } from "react-bootstrap";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();
    const product_details = useSelector((state) => state.Product_View);
    const { loading, error, product } = product_details;

    useEffect(() => {
        dispatch(ProductView(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <Row>
                    <Col md={5}>
                        <ListGroup>
                            <ListGroup.Item variant="flush">
                                <Image src={product.image} alt={product.name} fluid />
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price:
                                <strong style={{ marginLeft: "1px" }}>$ {product.price}</strong>
                            </ListGroup.Item>
                            <ListGroup.Item>Description:{product.description}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <FormControl
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {[...Array(product.countInStock).keys()].map((q) => (
                                                        <option key={q + 1} value={q + 1}>
                                                            {q + 1}
                                                        </option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <Button
                                                onClick={addToCartHandler}
                                                type="button"
                                                className=" btn-block"
                                                disabled={product.countInStock === 0}
                                            >
                                                Add to cart{" "}
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default ProductScreen;
