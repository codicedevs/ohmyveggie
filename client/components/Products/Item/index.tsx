//importing utils
import { ProductInterface } from '../../../interfaces';
//importing components
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import Rating from '../../Rating';

const Item: React.FC<ProductInterface> = ({
  _id,
  image,
  name,
  rating,
  numReviews,
  price,
  countInStock
}) => {
  return (
    <Link href={`/product/${_id}`} passHref>
      <a className="link-block w-inline-block">
        <>
          <div className="picture">
            <div className="offer">Oferta</div>
            <img
              src={image}
              loading="lazy"

            />
            { countInStock > 0 &&
              <div className="div-block-39">
                <div className="stocklevel disponible">Disponible</div>
              </div>
              
            }
          </div>
          <div className="productfooterwrapper">
            <div className="title">{name}</div>
            <div className="text-block-5">${price}</div>
            <div className="addbutton">+</div>
          </div>
        </>
      </a>
    </Link>
  );
};

export default Item;

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
