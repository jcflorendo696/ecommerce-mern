import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loading';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';


const ProductCarousel = () => {

    const { data:products, isLoading, error } = useGetTopProductsQuery(); 

    return isLoading ? (
        <Loader/> 
    ) : error ? ( 
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-primary mb-4'>
            {/* {products.map( product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.bannerImage} alt={product.name} fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>{product.name} (${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))} */}
                <Carousel.Item key='1'>
                    <Link to={`/product/64551569330a544c48354829`}>
                        <Image src='/images/iphone-14-banner-2.jpg' alt='iPhone 14 Pro' fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                            <h2>iPhone 14 Pro ($599.99)</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                <Carousel.Item key='2'>
                    <Link to={`/product/64551569330a544c4835482b`}>
                        <Image src='/images/ps5-banner-2.jpg' alt='Sony Playstation 5 Pro White Version' fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                        <h2>Sony Playstation 5 Pro White Version ($399.99)</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
                <Carousel.Item key='3'>
                    <Link to={`/product/64551569330a544c48354828`}>
                        <Image src='/images/airpods-pro-banner-2.jpg' alt='Airpods Wireless Bluetooth Headphones' fluid></Image>
                        <Carousel.Caption className='carousel-caption'>
                        <h2>Airpods Wireless Bluetooth Headphones ($89.99)</h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>


        </Carousel>
    )

}

export default ProductCarousel;