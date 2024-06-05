import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAdmin, useProductsActions, useTypedSelector } from '../../hooks';
import { ProductInterface } from '../../interfaces';
import { proshopAPI } from '../../lib';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';
import { Router, useRouter } from 'next/router';
import { createProduct } from '../../state/Products/products.action-creators';



interface ProductsEditProps {
  pageId: string | string[] | undefined;
}

const ProductsCreate: React.FC<ProductsEditProps> = () => {
  useAdmin();
  const router = useRouter()
  const initialProduct = {
    name: '',
    price: 0,
    image: '',
    category: '',
    numReviews: 0,
    countInStock: 0,
    description: '',
  };

  const { data, loading, error   } = useTypedSelector(state => state.productCreate);

  const makeErrorArray = (error) => {
    if (!error) return [];
    return Array.isArray(error) ? error : [error];
  };

  // const { fetchProduct, updateProduct } = useProductsActions();

  const [uploading, setUploading] = useState<boolean>(false);

  const [productDetails, setDetails] =
    useState<Partial<ProductInterface>>(initialProduct);
  const {createProduct} = useProductsActions();

    useEffect(() => {
    if (data) {
      setDetails({
        name: data.name,
        category: data.category,
        price: data.price,
        countInStock: data.countInStock,
        description: data.description,
        image: data.image,
      });
    }
  }, [data]);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await createProduct(productDetails); 
      console.log('en component', error)
          
    } catch(err)
    { console.log('Error', err)}
  };

  const uploadFileHandler = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await proshopAPI.post('/upload', formData, config);

      setDetails({ ...productDetails, image: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link href="/admin/products" passHref>
        <Button className="btn btn-light my-3">⇐ Volver</Button>
      </Link>
      <FormContainer>
        <h1>Crear Producto</h1>

        {error && <Message variant='danger'><ul style={{lineHeight: 2}}>{error.map(err=><li>{err}</li>)}</ul></Message>}        
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="name" className="py-2">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={productDetails.name}
                onChange={e =>
                  setDetails({ ...productDetails, name: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="py-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={productDetails.price}
                onChange={e =>
                  setDetails({
                    ...productDetails,
                    price: parseInt(e.target.value),
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="py-2">
              <Form.Label>Imagen del producto</Form.Label>
              <Form.Group controlId="formFile" onChange={uploadFileHandler}>
                <Form.Control type="file" />
              </Form.Group>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="countInStock" className="py-2">
              <Form.Label>Stock del producto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={productDetails.countInStock}
                onChange={e =>
                  setDetails({
                    ...productDetails,
                    countInStock: parseInt(e.target.value),
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="py-2">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={productDetails.category}
                onChange={e =>
                  setDetails({ ...productDetails, category: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="py-2">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={productDetails.description}
                onChange={e =>
                  setDetails({ ...productDetails, description: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <div className='d-flex column gap-3 mt-3'>
              
            <Button type="submit" variant="primary" >
              Crear
            </Button>
            <Button type="button" variant="primary" onClick={()=> router.replace('/admin/products')}>
              Volver
            </Button>
              </div>    
          </Form>
        
      </FormContainer>
    </>
  );
};

export default ProductsCreate;
