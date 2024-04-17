//importing types & utils
import { v4 as randomID } from 'uuid';
//importing hooks
import { useEffect, useState } from 'react';
import { useProductsActions, useTypedSelector } from '../../hooks';
//importing components
import { Row, Col, Button } from 'react-bootstrap';
import Item from './Item';
import Loader from '../Loader';
import Message from '../Message';
import Paginate from '../Paginate';
import ProductCarousel from '../ProductCarousel';
import Link from 'next/link';
import SearchBox from '../SearchBox';

interface ProductsInterface {
  keyword?: query;
  pageId?: query;
}

const Products: React.FC<ProductsInterface> = ({ keyword, pageId }) => {
  const {fetchCategories} = useProductsActions()
  const { fetchProducts } = useProductsActions();
  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector(state => state.products);

  const [cantCart, setCantCart] = useState(0);

  console.log('keyword:', keyword);
  console.log('products:', products);

  useEffect(()=> {
    fetchCategories()}
    , [fetchCategories])

  useEffect(() => {
    fetchProducts(keyword as string, parseInt(pageId as string));
    
  }, [fetchProducts, keyword, pageId]);
  

  //images/logo2.png
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
          
          <SearchBox />
          
          <a href="#productos" className="herolink">
            ¡Hacé tu pedido por la web y te lo enviamos a domicilio!
          </a>

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

            {keyword ?    // si hay busqueda no muestra destacados
              null
              :
              <>
                <div className="categorie">
                  <h2 className="heading-2">Productos destacados</h2>
                  {/* <div className="text-block-3">Le ofrecemos una gran variedad</div> */}
                </div>
                <div className="prods">
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <>

                      {
                      products.slice(0,3).map(product => (  // muestra los primeros 3 prods
                        <Item {...product} />
                      ))}


                    </>
                  )}
                </div>
              </>  
            }

            <div className="categorie">
              {keyword ?
                <h2 className="heading-2">{keyword}</h2>
                :
                <>
                  <h2 className="heading-2">TODOS LOS PRODUCTOS</h2>
                  <div className="text-block-3">La mejor elección para usted</div>
                </>
              }
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


                  <Paginate
                    pages={pages}
                    page={page}
                    keyword={keyword ? keyword : ''}
                  />
                </>
              )}

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
