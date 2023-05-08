import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loading';
import Message from '../components/Message';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    return (
        <>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            { isLoading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant='danger'>{ error?.data?.message || error.error }</Message>
            ) : (
                            <Row>
                            <Col md={5}>
                                <Image src={ product.image } alt={ product.name } fluid></Image>
                            </Col>
                            <Col md={4}>
                                <ListGroup>
                                    <ListGroup.Item>
                                        <h3>{ product.name }</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={ product.rating } text={`${ product.numReviews } reviews`}></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <p>{product.description}</p>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
            ) }

        </>
    )
}

export default ProductScreen;