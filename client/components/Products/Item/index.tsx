//importing utils
import { ProductInterface } from '../../../interfaces';
//importing components
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Rating from '../../Rating';
import { useCartActions, useTypedSelector } from '../../../hooks';
import { v4 as randomID } from 'uuid';
import Message from '../../Message';

const Item: React.FC<ProductInterface> = ({
  _id,
  image,
  name,
  rating,
  numReviews,
  price,
  countInStock
}) => {

  const { addToCart } = useCartActions();

  function addQtyProd() {  
    if ( 1 > countInStock) {
      <Message variant="danger">'Stock :' {countInStock}</Message>
      return
     }  
    addToCart({
      qty:  1,   // debería sumar 1 a la cant de prod en el carro
      productId: _id,
    })
  }

  return (
    <Link href={`/product/${_id}`} passHref>
      <a className="prodlink-block w-inline-block">
        <>
          <div className="picture">
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
          <div className="productfooterwrapper">
            <div className="title">{name}</div>
            <div className="text-block-5">${price}</div>
            <div className="addbutton" >+</div>
          </div>
        </>
      </a>
    </Link>
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
