import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
const Product = ({ product }) => {
    return (
        <Card style={{ width: '18rem', marginBottom: '2rem' }}>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={`${product.image}`} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text as="h6">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as="h3">
                    $ {product.price}
                </Card.Text>
                {/* <Button variant="primary">Add to Cart</Button> */}
            </Card.Body>
        </Card>
    )
}
export default Product
