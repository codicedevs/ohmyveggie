import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useAdmin,
  useCategoriesActions,
  useProductsActions,
  useTypedSelector,
} from "../../hooks";
import { ProductInterface } from "../../interfaces";
import { proshopAPI } from "../../lib";
import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";
import { Router, useRouter } from "next/router";
import { createProduct } from "../../state/Products/products.action-creators";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface ProductsEditProps {
  pageId: string | string[] | undefined;
}

const ProductsCreate: React.FC<ProductsEditProps> = () => {
  useAdmin();
  const router = useRouter();
  const initialProduct = {
    name: "",
    price: 0,
    image: "",
    categories: [],
    numReviews: 0,
    countInStock: 0,
    description: "",
  };

  const { data, loading, error } = useTypedSelector(
    (state) => state.productCreate
  );
  const { data: categories } = useTypedSelector((state) => state.categories);

  const makeErrorArray = (error) => {
    if (!error) return [];
    return Array.isArray(error) ? error : [error];
  };

  const [uploading, setUploading] = useState<boolean>(false);
  const [productDetails, setDetails] =
    useState<Partial<ProductInterface>>(initialProduct);
  const { createProduct } = useProductsActions();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct(productDetails);
    } catch (err) {
      console.error("Error", err);
    }
  };

  const uploadFileHandler = async (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await proshopAPI.post("/upload", formData, config);

      setDetails({ ...productDetails, image: data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleCategs = async (selectedCategories: any) => {
    setDetails({ ...productDetails, categories: selectedCategories });
  };

  return (
    <>
      <Link href="/admin/products" passHref>
        <Button className="btn btn-light my-3">⇐ Volver</Button>
      </Link>
      <FormContainer>
        <h1>Crear Producto</h1>

        {error && (
          <Message variant="danger">
            <ul style={{ lineHeight: 2 }}>
              {Array.isArray(error) ? (
                error.map((err) => <li>{err}</li>)
              ) : (
                <li>{error}</li>
              )}
            </ul>
          </Message>
        )}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="name" className="py-2">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="name"
              placeholder="Ingrese Nombre"
              value={productDetails.name}
              onChange={(e) =>
                setDetails({ ...productDetails, name: e.target.value })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="py-2">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese Precio"
              value={productDetails.price}
              onChange={(e) =>
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
              type="text"
              placeholder="Ingrese Stock"
              value={productDetails.countInStock}
              onChange={(e) =>
                setDetails({
                  ...productDetails,
                  countInStock: parseInt(e.target.value),
                })
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Categorias</Form.Label>
            <Typeahead
              allowNew
              id="categories-selected"
              multiple
              newSelectionPrefix="Agregar nueva categoria"
              options={categories}
              labelKey="name"
              onChange={handleCategs}
              selected={productDetails.categories}
              placeholder="Ingrese las categorias del producto"
              emptyLabel="No hay categorias con ese nombre"
            />
          </Form.Group>

          <Form.Group controlId="description" className="py-2">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripcion"
              value={productDetails.description}
              onChange={(e) =>
                setDetails({ ...productDetails, description: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <div className="d-flex column gap-3 mt-3">
            <Button type="submit" variant="primary">
              Crear
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => router.replace("/admin/products")}
            >
              Volver
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductsCreate;
