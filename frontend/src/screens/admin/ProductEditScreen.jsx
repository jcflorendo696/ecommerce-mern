import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loading';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { 
         useUpdateProductMutation,
         useGetProductDetailsQuery, 
         useUploadProductImageMutation,
         useUploadProductBannerImageMutation
        } from '../../slices/productsApiSlice';


const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [banner_image, setBannerImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const { data:product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const [uploadProductBannerImage, { isLoading: loadingBannerUpload}] = useUploadProductBannerImageMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            banner_image,
            brand,
            category,
            description,
            countInStock,
        };

        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(err?.data?.message || err.error);
        }else{
            toast.success('Product Updated');
            navigate('/admin/productlist');
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();

        formData.append('image', e.target.files[0]);
        try{
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        }catch(err){
            toast.error(err?.data?.message || err.error);
        }

        // Takes in an event object.
        // That event object has target.files.
        // Depending on the number of uploaded files is the array length.
        // [0] because right now its only one.
        console.log(e.target.files[0]);
    }

    const uploadBannerImageFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('banner_image', e.target.files[0]);
        try{
            const res = await uploadProductBannerImage(formData).unwrap();
            toast.success(res.message);
            setBannerImage(res.bannerImage);
        }catch(err){
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(()=>{
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBannerImage(product.bannerImage);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                { loadingUpdate && <Loader></Loader>}

                { isLoading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={ submitHandler }>
                        <Form.Group controlId='name' className='my-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-3'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image' className='my-2'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter image url ' value={image} onChange={ (e)=> setImage }></Form.Control>
                            <Form.Control type='file' label='Choose file' onChange={ uploadFileHandler }></Form.Control>
                        </Form.Group>
                        {loadingUpload && <Loader></Loader>}
                        
                        <Form.Group controlId='banner_image' className='my-2'>
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter banner image url ' value={banner_image} onChange={ (e)=> setBannerImage }></Form.Control>
                            <Form.Control type='file' label='Choose file' onChange={ uploadBannerImageFileHandler }></Form.Control>
                        </Form.Group>
                        {loadingBannerUpload && <Loader></Loader>}

                        <Form.Group controlId='brand' className='my-3'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-3'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type='number' placeholder='Enter Count in Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price' className='my-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description' className='my-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' rows={5} placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='my-2'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen;