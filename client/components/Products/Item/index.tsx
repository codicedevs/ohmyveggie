//importing utils
import { CartItemInterface, ProductInterface } from "../../../interfaces";
//importing components
import Link from "next/link";
import { Card } from "react-bootstrap";
import Rating from "../../Rating";
import { useCartActions, useTypedSelector } from "../../../hooks";
import { v4 as randomID } from "uuid";
import Message from "../../Message";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../../state/UI/ui.action-types";
import { toast } from "react-toastify";
import Loader from "../../Loader";

const Item: React.FC<ProductInterface> = (product) => {
  const { _id, image, name, rating, numReviews, price, countInStock } = product;
  const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector((state) => state.cart);
  const { data } = useTypedSelector((state) => state.user);
  const { addToCart, removeFromCart } = useCartActions();
  const [isVisibleAddButton, setIsVisibleAddButton] = useState(false);

  const { loading: cartLoading, data: cartData } = useTypedSelector(
    (state) => state.cart
  );
  const quantity =
    cartData.cartItems.find((item) => item.productId === _id)?.qty || 0;

  async function addQtyProd(item: any) {
    console.log("stock", countInStock);
    const cartItemInterface = await cartData.cartItems.find((item) => {
      return item.productId == _id;
    });

    if (countInStock <= cartItemInterface?.qty || countInStock <= 0) {
      toast.error(`El stock es insuficiente`);
      return;
    }
    if (cartItemInterface) {
      addToCart({
        qty: cartItemInterface.qty + 1, // debería sumar 1 a la cant de prod en el carro
        productId: _id,
      });
    } else {
      addToCart({
        qty: 1, // debería sumar 1 a la cant de prod en el carro
        product,
      });
    }
  }

  function subtractQtyProd(item: any) {
    const result = cartData.cartItems.find(function (item) {
      return item.productId == _id;
    });
    if (!result) return;
    if (result.qty <= 1) {
      removeFromCart(result.productId);
      setIsVisibleAddButton(false);
      return;
    }

    addToCart({
      qty: result.qty - 1,
      productId: _id,
    });
  }

  function changeAddButton() {
    setIsVisibleAddButton(true);
    const result = cartData.cartItems.find(function (item) {
      return item.productId == _id;
    });
    addQtyProd(result);
  }
  const itemExists = cartItems.find((p) => p.productId === product._id);

  return (
    <>
      <div className="prodlink-block w-inline-block">
        <Link href={`/product/${_id}`} passHref>
          <a>
            <>
              <div className="picture" title="Ver detalle de producto">
                <img
                  src={
                    image
                      ? image
                      : "/images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979-p-500.png"
                  }
                  loading="lazy"
                />
              </div>
            </>
          </a>
        </Link>
        <div className="productfooterwrapper">
          <div className="title">{name}</div>
          <div className="text-block-5">${price}</div>

          {itemExists ? (
            <div className="addbutton" style={{ backgroundColor: "#ccdfce" }}>
              <div className="addRestButton" onClick={addQtyProd}>
                {" "}
                +{" "}
              </div>
              <div className="addRestButton"> {quantity} </div>
              <div className="addRestButton" onClick={subtractQtyProd}>
                {" "}
                -{" "}
              </div>
            </div>
          ) : (
            <div className="addbutton" onClick={changeAddButton}>
              +
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Item;
