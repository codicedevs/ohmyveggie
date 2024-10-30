//importing types & utils
import { v4 as randomID } from "uuid";
//importing hooks
import { useEffect, useState } from "react";
import {
  useCategoriesActions,
  useProductsActions,
  useTypedSelector,
} from "../../hooks";
//importing components
import { Row, Col, Button } from "react-bootstrap";
import Item from "./Item";
import Loader from "../Loader";
import Message from "../Message";
import Paginate from "../Paginate";
import ProductCarousel from "../ProductCarousel";
import Link from "next/link";
import SearchBox from "../SearchBox";
import { useRouter } from "next/router";

interface ProductsInterface {
  keyword?: query;
  pageId?: query;
}

const Products: React.FC<ProductsInterface> = ({ keyword, pageId }) => {
  const [catSel, setCatSel] = useState("");
  const [catSelectedId, setCatSelectedId] = useState("");
  const { fetchCategories } = useCategoriesActions();
  const { fetchProducts } = useProductsActions();
  const {
    loading,
    error,
    data: { products, pages, page },
  } = useTypedSelector((state) => state.products);
  const { data: categories } = useTypedSelector((state) => state.categories);
  const { data: cartItems } = useTypedSelector((state) => state.cart);
  const router = useRouter();
  //
  const addQueryParam = (cat, id) => {
    const params = new URLSearchParams();
    params.set("category", cat);
    params.set("id", id);
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  function handleCatSel(cat: string, id: string) {
    setCatSel(cat);
    setCatSelectedId(id);
    addQueryParam(cat, id);
  }

  const Button = ({ filter }: { filter: string }) => {
    function handleClose(filter: string) {
      switch (filter) {
        case "category": {
          setCatSel("");
          setCatSelectedId("");
          window.history.replaceState(null, "", `${window.location.pathname}`);
        }
        default:
          break;
      }
    }
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose(filter);
        }}
        type="button"
        className="btn-close"
        aria-label="Close"
        style={{ marginLeft: 15, width: 1, alignItems: "center", zIndex: 1000 }}
      ></button>
    );
  };

  useEffect(() => {
    if (router.query && !catSel) {
      if (router.isReady && router.query.category) {
        fetchProducts({
          keyword,
          pageId: Number(pageId?.toString()),
          categories: router.query.category as string,
          isAdmin: false,
          shouldScroll: true,
        });
      }
    } else {
      fetchProducts({
        keyword,
        pageId: Number(pageId?.toString()),
        categories: catSel,
        isAdmin: false,
        shouldScroll: true,
      });
    }

    fetchCategories();
  }, [keyword, pageId, catSel, router.query]);

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
      <div id="scrollUp" />
      <section id="productos" className="section">
        <div id="products" className="wrapperprods">
          <div className="wrapperstyckymenu">
            <div className="stickymenu">
              <div className="div-block-14">
                <div className="div-block-13">
                  <div className="text-block-2">Categorías</div>
                </div>
                <div className="div-block-15" />
              </div>
              <ul role="list" className="list w-list-unstyled">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className={
                      catSelectedId === idx.toString()
                        ? "listitem listitemselected"
                        : "listitem"
                    }
                    style={{ fontSize: "0.8rem" }}
                    onClick={() => {
                      handleCatSel(cat.name, idx.toString());
                    }}
                  >
                    {cat.name.slice(0, 20)}
                    {catSelectedId === idx.toString() && (
                      <Button filter="category" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="div-block-17">
            <div className="categorie">
              {keyword ? (
                <h2 className="heading-2">{keyword}</h2>
              ) : (
                <>
                  {catSel || router.query.category ? (
                    <h2 className="heading-2">
                      {catSel || router.query.category}
                    </h2>
                  ) : (
                    <h2 className="heading-2">TODOS LOS PRODUCTOS</h2>
                  )}
                  <div className="text-block-3">
                    La mejor elección para usted
                  </div>
                </>
              )}
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
                    keyword={keyword ? keyword : ""}
                    category={catSel}
                    isAdmin={false}
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

{
}
