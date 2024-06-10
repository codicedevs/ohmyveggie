import Link from 'next/link';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAdmin, useProductsActions, useTypedSelector } from '../../hooks';
import { ProductInterface } from '../../interfaces';
import { proshopAPI } from '../../lib';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';
import { useRouter } from 'next/router';

interface ProductsEditProps {
  pageId: string | string[] | undefined;
}

const ProductsEdit: React.FC<ProductsEditProps> = ({ pageId }) => {
  useAdmin();
  const router = useRouter();
  const initialProduct = {
    name: '',
    price: 0,
    image: '',
    category: '',
    numReviews: 0,
    countInStock: 0,
    description: '',
  };

  const { data, loading, error } = useTypedSelector(state => state.product);

  const { fetchProduct, updateProduct } = useProductsActions();

  const [uploading, setUploading] = useState<boolean>(false);

  const [productDetails, setDetails] =
    useState<Partial<ProductInterface>>(initialProduct);

  useEffect(() => {
    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

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

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProduct(pageId as string, productDetails);
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
        <h1>Editar Producto</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="name" className="py-2">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="name"
                placeholder="Nombre producto"
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
                placeholder="Precio del producto"
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
                placeholder="Stock de producto"
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
                placeholder="Categoria del producto"
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
                placeholder="Description del producto"
                value={productDetails.description}
                onChange={e =>
                  setDetails({ ...productDetails, description: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <div className="d-flex" style={{gap: 20}}>
            <Button type="submit" variant="primary" className="mt-3">
              Actualizar
            </Button>
            <Button type="button" variant="primary" className="mt-3" onClick={()=> router.back()}>
              Volver
            </Button>
              </div>    
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductsEdit;
