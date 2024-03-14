//importing types & utils
import { v4 as randomID } from 'uuid';
//importing hooks
import { useEffect } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
//importing components
import { Row, Col, Button } from 'react-bootstrap';
import Item from './Item';
import Loader from '../Loader';
import Message from '../Message';
import Paginate from '../Paginate';
import ProductCarousel from '../ProductCarousel';
import Link from 'next/link';

interface ProductsInterface {
  keyword?: query;
  pageId?: query;
}

const Products: React.FC<ProductsInterface> = ({ keyword, pageId }) => {
  const { fetchProducts } = useProductsActions();
  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector(state => state.products);

  console.log('keyword:', keyword);
  console.log('products:', products);


  useEffect(() => {
    fetchProducts(keyword as string, parseInt(pageId as string));
  }, [fetchProducts, keyword, pageId]);
  

  return (
    <>
      <div className="div-block-8">
        <div className="div-block-16">
          <img
            src="images/logo2.png"
            loading="lazy"
            width={185}
            alt=""
            className="image-5"
          />
          <h1 className="heading">Comprá Online</h1>
          <div className="div-block-9">
            <img
              src="images/searchIcon.png"
              loading="lazy"
              alt=""
              className="image"
            />
            <div className="text-block-6">¿Qué estás buscando?</div>
          </div>
          <a href="#productos" className="link">
            ¡Hacé tu pedido por la web y te lo enviamos a domicilio!
          </a>
          <div className="text-block-20">
            Envíos adomicilio | Fisherton | Funes | Rosario
          </div>
        </div>
      </div>

      <section id="productos" className="section">
        <div id="products" className="wrapperprods">
          <div className="wrapperstyckymenu">
            <div className="stickymenu">
              <div className="div-block-14">
                <div className="div-block-13">
                  <div className="text-block-2">Marcas</div>
                </div>
                <div className="div-block-15" />
              </div>
              <ul role="list" className="list w-list-unstyled">
                <li className="listitem">ALIF</li>
                <li className="listitem">AnimalKind</li>
                <li className="listitem">Arbanit</li>
                <li className="listitem">Argendiet</li>
                <li className="listitem">BIBA</li>
                <li className="listitem">BRU</li>
                <li className="listitem">Binfinit</li>
              </ul>
              <div className="div-block-14">
                <div className="div-block-13">
                  <div className="text-block-2">Categorías</div>
                </div>
                <div className="div-block-15" />
              </div>
              <ul role="list" className="list w-list-unstyled">
                <li className="listitem">Promociones</li>
                <li className="listitem">Secos</li>
                <li className="listitem">Sin TACC</li>
                <li className="listitem">Conservas</li>
                <li className="listitem">Almacén</li>
                <li className="listitem">Aderezos</li>
                <li className="listitem">Sustitutos lácteos</li>
              </ul>
            </div>
          </div>
          <div className="div-block-17">
            <div className="categorie">
              <h2 className="heading-2">Productos destacados</h2>
              <div className="text-block-3">La mejor elección para usted</div>
            </div>
            <div className="prods">

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>

                  {products.map(product => (
                    <Item {...product} />
                  ))}


                  {/*<Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />*/}
                </>
              )}

            </div>
            <div className="categorie">
              <h2 className="heading-2">Todos los productos</h2>
              <div className="text-block-3">Le ofrecemos una gran variedad</div>
            </div>
            <div className="prods">

              <a href="detalleproducto.html" className="link-block w-inline-block">
                <div className="picture">
                  <div className="offer">Oferta</div>
                  <img
                    src="images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979.png"
                    loading="lazy"
                    sizes="(max-width: 479px) 21vw, (max-width: 767px) 14vw, (max-width: 991px) 17vw, 16vw"
                    srcSet="images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979-p-500.png 500w, images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979.png 768w"
                    alt=""
                    className="image-7"
                  />
                </div>
                <div className="productfooterwrapper">
                  <div className="title">Veggie burguer</div>
                  <div className="text-block-5">$ 3.500,00 </div>
                  <div className="addbutton">+</div>
                </div>
              </a>

            </div>
            
            <div className="categorie">
              <ProductCarousel />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Products;

{/*<>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link href="/" passHref>
          <Button className="btn btn-light">Go back</Button>
        </Link>
      )}

      <h1>Latest products xxx</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col sm={12} md={6} lg={4} xl={3} key={randomID()}>
                <Item {...product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
            </>*/}
