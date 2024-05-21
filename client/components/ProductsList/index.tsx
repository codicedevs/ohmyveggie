import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useAdmin, useProductsActions, useTypedSelector } from '../../hooks';
import Loader from '../Loader';
import Message from '../Message';
import Paginate from '../Paginate';
import SearchBoxAdmin from '../SearchBoxAdmin';


interface ProductListProps {
  pageId?: query;
}

const ProductsList: React.FC<ProductListProps> = ({ pageId }) => {
  useAdmin();


  const { fetchProducts, deleteProduct, createProduct } = useProductsActions();

  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector(state => state.products);

  const { success: successDelete } = useTypedSelector(
    state => state.productDelete
  );

  useEffect(() => {
    fetchProducts('', parseInt(pageId as string));
  }, [fetchProducts, successDelete, pageId]);

  const search = (keyword: string) => {
    fetchProducts(keyword, parseInt(pageId as string));
  }

  return (
    <>
    <section className='d-flex row' style={{paddingLeft: 40, paddingRight: 40, justifyContent: 'center', gap: 30, fontWeight: 500}}>
      <h1>Productos</h1>
      <Row className="align-items-center" style={{justifyContent: 'center'}}>
        <Col>
          <SearchBoxAdmin search={search}/>  
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            onClick={() => createProduct()}
            style={{ float: 'right' }}
          >
            <i className="fas fa-plus"></i>  Crear nuevo Producto
          </Button>
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
                <th>Marca</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(_product => (
                <tr key={_product._id}>
                  <td>{_product._id}</td>
                  <td>{_product.name}</td>
                  <td>${_product.price}</td>
                  <td>{_product.category}</td>
                  <td>{_product.brand}</td>
                  <td>
                    <Link
                      href={`/admin/products/edit/${_product._id}`}
                      passHref
                    >
                      <Button variant="light" className="btn-sm" title='Editar' >
                                           
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
                            'Are you sure you want to delete this product?'
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
