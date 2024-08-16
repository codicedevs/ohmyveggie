import Link from "next/link";
import { useEffect, useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import {
  useAdmin,
  useCategoriesActions,
  useProductsActions,
  useTypedSelector,
} from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import SearchBoxAdmin from "../SearchBoxAdmin";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

interface ProductListProps {
  pageId?: query;
}
const ProductsList: React.FC<ProductListProps> = ({ pageId }) => {
  useAdmin();
  const { fetchProducts, deleteProduct, createProduct, updateProduct } =
    useProductsActions();
  const { fetchCategories } = useCategoriesActions();
  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector((state) => state.products);
  const { success: successDelete } = useTypedSelector(
    (state) => state.productDelete
  );
  const [selectCategProd, setSelectCategProd] = useState({
    _id: null,
    name: "",
  });
  const { data: categories } = useTypedSelector((state) => state.categories);

  useEffect(() => {
    fetchProducts({ pageId: Number(pageId?.toString()) });
    fetchCategories();
  }, [fetchProducts, successDelete, pageId]);

  const search = (keyword: string) => {
    fetchProducts({ keyword, pageId: Number(pageId?.toString()) });
  };

  const handleCategs = async (productId: string, selectedCategories: any) => {
    let product = products.find((p) => p._id === productId);
    product = { ...product, categories: selectedCategories };

    updateProduct(product._id as string, product, pageId);
    console.log(selectedCategories, "a ver");
  };

  const availableCategories = (selectedCategories: any) => {
    const categoriesSel = categories.filter(
      (cat) =>
        !selectedCategories.some((selectedCat) => selectedCat._id === cat._id)
    );
    console.log("las categ dispo", categoriesSel);
    return categoriesSel;
  };
  console.log("que hay aca", products);
  return (
    <>
      <section
        className="d-flex row"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          justifyContent: "center",
          gap: 30,
          fontWeight: 500,
        }}
      >
        <h1>Productos</h1>
        <Row
          className="align-items-center"
          style={{ justifyContent: "center" }}
        >
          <Col>
            <SearchBoxAdmin search={search} />
          </Col>
          <Col className="text-right">
            <Link href={`/admin/products/create/`} passHref>
              <Button className="my-3" style={{ float: "right" }}>
                <i className="fas fa-plus"></i> Crear nuevo Producto
              </Button>
            </Link>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID de producto</th>
                  <th>Nombre de producto</th>
                  <th>Precio</th>
                  <th>Categoria</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((_product) => (
                  <tr key={_product._id}>
                    <td>{_product._id}</td>
                    <td>{_product.name}</td>
                    <td>${_product.price}</td>
                    <td>
                      <Typeahead
                        allowNew
                        id="categories-selected"
                        multiple
                        newSelectionPrefix="Agregar nueva categoria"
                        options={availableCategories(_product.categories)}
                        labelKey="name"
                        onChange={(selected) => {
                          handleCategs(_product._id, selected);
                        }}
                        selected={_product.categories}
                        placeholder="Ingrese las categorias del producto"
                        emptyLabel="No hay categorias con ese nombre"
                      />
                    </td>
                    <td>
                      <Link
                        href={`/admin/products/edit/${_product._id}`}
                        passHref
                      >
                        <Button
                          variant="light"
                          className="btn-sm"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        title="Borrar"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            deleteProduct(_product._id);
                          }
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </section>
    </>
  );
};
export default ProductsList;
