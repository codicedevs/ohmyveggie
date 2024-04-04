//importing utils
import { CartItemInterface, ProductInterface } from '../../../interfaces';
//importing components
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Rating from '../../Rating';
import { useCartActions, useTypedSelector } from '../../../hooks';
import { v4 as randomID } from 'uuid';
import Message from '../../Message';
import { useEffect, useState } from 'react';


const Item: React.FC<ProductInterface> = (product) => {
  const {
    _id,
    image,
    name,
    rating,
    numReviews,
    price,
    countInStock
  
  } = product
  const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector(state => state.cart);
  const { data } = useTypedSelector(state => state.user);
  const { addToCart, removeFromCart } = useCartActions();
  const [isVisibleAddButton, setIsVisibleAddButton] = useState(false);
  const { loading: cartLoading, data: cartData } = useTypedSelector(state => state.cart);

  const [cantProd, setCantProd] = useState(0);

  useEffect(() => {
    const result = cartData.cartItems.find(function (item) { return item.productId == _id; });
    if (!result) return
    console.log('substract', result.qty);
    setCantProd(result.qty);
  }, [cartItems])

  function addQtyProd(item: any) {
    if (1 > countInStock) {
      <Message variant="danger">'Stock :' {countInStock}</Message>
      return
    }

    const cartItemInterface = cartData.cartItems.find(function (item) { return item.productId == _id; });
      console.log('add', cartItemInterface);
      if(cartItemInterface){
        setCantProd(cartItemInterface.qty + 1);
        addToCart({
          qty: cartItemInterface.qty + 1,   // debería sumar 1 a la cant de prod en el carro
          productId: _id,
        })
      }else{
        setCantProd(1);
        addToCart({
          qty:  1,   // debería sumar 1 a la cant de prod en el carro
          product
        })
      }


  }

  function subtractQtyProd(item: any) {
    const result = cartData.cartItems.find(function (item) { return item.productId == _id; });
    if (!result ||result.qty < 1) {
      // console.log('substractCero', result.qty);
      setIsVisibleAddButton(false);
      return
    }  
    console.log('substract', result.qty);
    setCantProd(result.qty - 1);
    addToCart({
      qty: result.qty - 1,
      productId: _id,
    })
  }

  function changeAddButton() {
    setIsVisibleAddButton(true);
    const result = cartData.cartItems.find(function (item) { return item.productId == _id; });
    addQtyProd(result);
  }

  return (


    <>
      <div className="prodlink-block w-inline-block">
        <Link href={`/product/${_id}`} passHref>
          <a>
            <>
              <div className="picture" title='Ver detalle de producto'>
                <div className="offer">Oferta</div>
                <img
                  src='/images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979-p-500.png'
                  loading="lazy"

                />
                {/* { countInStock > 0 &&
                <div className="div-block-39">
                  <div className="stocklevel disponible">Disponible</div>
                </div>
              } */}
              </div>
            </>
          </a>
        </Link>
        <div className="productfooterwrapper">
          <div className="title">{name}</div>
          <div className="text-block-5">${price}</div>
          {isVisibleAddButton || cantProd > 0 ?       //-------------------------------------------------
            <div className="addbutton">
              <div className='addRestButton' onClick={addQtyProd}> + </div>
              <div className='addRestButton'> {cantProd} </div>
              <div className='addRestButton' onClick={subtractQtyProd}> - </div>
            </div>
            : <div className="addbutton" onClick={changeAddButton}>+</div>
          }
        </div>

      </div >
    </>


  );
};

export default Item;

//onClick= {() => addQtyProd(item)}

{/*<Card className="my-3 p-3 rounded cursor-pointer" role="button">
      <Link href={`/product/${_id}`} passHref>
        <Card.Img src={image} variant="top"></Card.Img>
      </Link>

      <Card.Body>
        <Link href={`/product/${_id}`} passHref>
          <Card.Title as="div">
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating value={rating} text={`${numReviews} reviews`} />
          </div>
        </Card.Text>

        <Card.Text as="h3" className="py-1">
          ${price}
        </Card.Text>
      </Card.Body>
    </Card> */}
