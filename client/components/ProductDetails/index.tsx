import { v4 as randomID } from 'uuid';
import {
  useCartActions,
  useProductsActions,
  useTypedSelector,
} from '../../hooks';
import { FormEvent, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  ToastContainer,
} from 'react-bootstrap';
import Rating from '../Rating';
import Loader from '../Loader';
import Message from '../Message';
import Link from 'next/link';

interface ProductDetailsProps {
  pageId: string | string[] | undefined;
}


const ProductDetails: React.FC<ProductDetailsProps> = ({ pageId }) => {
  const [qty, setQty] = useState(1);
  const [_rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { fetchProduct, createProductReview } = useProductsActions();
  const { addToCart } = useCartActions();

  const { loading, error, data } = useTypedSelector(state => state.product);
  const { loading: cartLoading,data: cartData } = useTypedSelector(state => state.cart);
  const { data: user } = useTypedSelector(state => state.user);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = useTypedSelector(state => state.productCreateReview);

  /*const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector(state => state.cart);*/

  const { image, name, price, countInStock, description, rating, numReviews } =
    data;

  useEffect(() => {
    if (!pageId) return;

    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createProductReview(pageId as string, { rating: _rating, comment });
  };
  

  return (
    <section className="section-2">
      
      <div className="div-block-23" title='Ver detalle de producto'>
                <img
                  src={image? image : '/images/90656_VIVERA_UK_PACKSHOT_VEGGIE-BURGER-768x979-p-500.png'}
                  loading="lazy"

                />
              </div>
        <div className="div-block-24">
        <h1 className="heading-3">{name}</h1>
        <div className="div-block-26">Oferta</div>
        <div className="text-block-8">${price}</div>
        {
          countInStock > 0 ?
          <div className="text-block-9">Stock disponible</div>
          :
          <div className="text-block-9 agotado">Agotado</div>
        }
        
        
        <p className="paragraph-3">
          {description}
        </p>
        {countInStock > 0 ?
          <Button
            variant='success'
            type="button"
            className="btn btn-block"
            onClick={() => {   // va al carro, no tiene que ir - Modificado en state/Cart/cart.actions.creators/addToCart
              //let qutuy = qty;
              //setQty( qutuy + 1)
              //alert(qty);

              addToCart({
                product: data,
                qty,  //----------------------------------> Verificar porque modifica el total de productos del carro <----------------------------
              });
            }}
          >
            Añadir al carro
          </Button>
          : null
        }

        <Link href="/#productos" passHref>
          <Button
            variant='outline-dark'
            type="button"
            className="btn btn-block"
          >
            Volver
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ProductDetails;



