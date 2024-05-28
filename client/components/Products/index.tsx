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
import { useRouter } from 'next/router';
import useToast from '../Toast/useToast';



interface ProductsInterface {
  keyword?: query;
  pageId?: query;
  brand?: query;
}


const Products: React.FC<ProductsInterface> = ({ keyword, pageId, brand }) => {

  const Button = ({ filter }: { filter: string }) => {

    function handleClose(filter: string) {

      switch (filter) {
        case "brand":
          setBrandSel('')
          setBrandSelectedId('')


          break;
        case 'category': {
          setCatSel('')
          setCatSelectedId('')
        }
        default:

          break
      }
    }
    return (
      <button onClick={(e) => { e.stopPropagation(); handleClose(filter) }} type="button" className="btn-close" aria-label="Close" style={{ marginLeft: 15, width: 1, alignItems: 'center', zIndex: 1000 }}></button>
    )
  }
  const [catSel, setCatSel] = useState('')
  const [catSelectedId, setCatSelectedId] = useState('')
  const [brandSelectedId, setBrandSelectedId] = useState('')
  const [brandSel, setBrandSel] = useState('')
  const [currentPage, setCurrentPage] = useState("")




  function handleBrandSel(brand: string, id: string) {
    setBrandSel(brand)
    setBrandSelectedId(id)

  }
  function handleCatSel(cat: string, id: string) {
    setCatSel(cat)
    setCatSelectedId(id)

  }

  const { fetchCategories } = useProductsActions()
  const { fetchProducts } = useProductsActions();
  const {
    loading,
    error,
    data: { products, pages, page },
    categories,
    
  } = useTypedSelector(state => state.products);

  const [cantCart, setCantCart] = useState(0);

  useEffect(() => {
    fetchCategories()     
  }
    , [])

  useEffect(() => {
    fetchProducts({ keyword, pageId: Number(pageId?.toString()), category: catSel });


  }, [keyword, pageId, brandSel, catSel]);


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

      <section id="productos" className="section" >
        <div id="products" className="wrapperprods" >
          <div className="wrapperstyckymenu">
            <div className="stickymenu">

              <div className="div-block-14">
                <div className="div-block-13">
                  <div className="text-block-2">Categorías</div>
                </div>
                <div className="div-block-15" />
              </div>
              <ul role="list" className="list w-list-unstyled">
                {categories.map((cat, idx) => <li
                  key={idx}
                  className={(catSelectedId === idx.toString()) ? "listitem listitemselected" : "listitem"}
                  onClick={() => {
                    handleCatSel(cat, idx.toString())
                  }}



                >
                  {cat}
                  {catSelectedId === idx.toString() && <Button filter="category" />}

                </li>)}

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
                <div className="prods" >
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <>

                      {
                        products.slice(0, 3).map((product, idx) => (  // muestra los primeros 3 prods
                          <Item key={idx} {...product} />
                        ))}


                    </>
                  )}
                </div>
              </>
            }

            <div className="categorie" id="scrollUp">
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

                  {products.map((product, idx) => (
                    <Item key={idx} {...product} />
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
