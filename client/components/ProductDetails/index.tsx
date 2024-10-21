import { v4 as randomID } from "uuid";
import {
  useCartActions,
  useProductsActions,
  useTypedSelector,
} from "../../hooks";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, ListGroup } from "react-bootstrap";
import Link from "react-router-dom";
import { useRouter } from "next/router";

interface ProductDetailsProps {
  pageId: string | string[] | undefined;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ pageId }) => {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const { fetchProduct, createProductReview } = useProductsActions();
  const { addToCart } = useCartActions();
  const {
    loading,
    error,
    data: product,
  } = useTypedSelector((state) => state.product);
  const { loading: cartLoading, data: cartData } = useTypedSelector(
    (state) => state.cart
  );
  const { data: user } = useTypedSelector((state) => state.user);

  const {
    image,
    name,
    price,
    countInStock,
    description,
    rating,
    numReviews,
    _id,
  } = product;

  useEffect(() => {
    if (!pageId) return;

    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

  function addQtyProd() {
    const cartItemInterface = cartData.cartItems.find(function (item) {
      return item.productId == product._id;
    });

    if (countInStock <= cartItemInterface?.qty) {
      toast.error(`El stock es insuficiente`);
      return;
    }

    if (cartItemInterface) {
      addToCart({
        qty: cartItemInterface?.qty + 1, // debería sumar 1 a la cant de prod en el carro
        productId: _id,
      });
    } else {
      addToCart({
        qty: 1, // suma el producto por primera vez
        product,
      });
    }
    toast.info("Producto agregado al carrito", { theme: "light" });
  }

  return (
    <section className="section-2">
      <div className="div-block-23" title="Ver detalle de producto">
        <img src={image ? image : "/images/1.png"} loading="lazy" />
      </div>
      <div className="div-block-24">
        <h1 className="heading-3">{name}</h1>
        <div className="text-block-8">${price}</div>
        {countInStock > 0 ? (
          <div className="text-block-9">Stock disponible</div>
        ) : (
          <div className="text-block-9 agotado">Agotado</div>
        )}

        <div className="mt-4">
          <ListGroup horizontal style={{ gap: 10 }}>
            {product.categories.map((category) => (
              <ListGroup.Item
                key={category._id}
                variant="success"
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: "#886699",
                  borderRadius: 6,
                  lineHeight: 1.2,
                  color: "white",
                  fontSize: "0.7em",
                  fontWeight: 400,
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {category.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>

        <p className="paragraph-3">{description}</p>
        {countInStock > 0 ? (
          <Button
            variant="success"
            type="button"
            className="btn btn-block"
            onClick={addQtyProd}
          >
            Añadir al carro
          </Button>
        ) : null}

        <Button
          variant="outline-dark"
          type="button"
          className="btn btn-block"
          onClick={() => router.back()}
        >
          Volver
        </Button>

        {/* <Link href="/#productos" passHref>
          
        </Link> */}
      </div>
    </section>
  );
};

export default ProductDetails;
