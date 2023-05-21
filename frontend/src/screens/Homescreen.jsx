import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loading';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';


const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

    return (
        <>
            { isLoading ? (
                <Loader></Loader>
            ) : error ? (
            <div>
                <Message variant='danger'>{ error?.data?.message || error.error }</Message>
            </div>) : (
                <>
                <h1>Latest Products</h1>
                <Row>
                    {data.products.map( (product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product}></Product>
                        </Col>
                    ) )}
                </Row>
                <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
                </>
            ) }
        </>
    )
}

export default HomeScreen;