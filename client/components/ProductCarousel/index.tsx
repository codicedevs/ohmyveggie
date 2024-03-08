import React, { useEffect } from 'react';
import Link from 'next/link';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { useProductsActions, useTypedSelector } from '../../hooks';

const ProductCarousel = () => {

  return (

    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to={0}
          className="active"
        />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src="../public/images/slide2.jpg" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src="..." alt="Second slide" />
        </div>

      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>


  );
};

export default ProductCarousel;

{/*const { fetchTopRatedProducts } = useProductsActions();

  const { loading, error, data } = useTypedSelector(
    state => state.productsTopRated
  );

  useEffect(() => {
    fetchTopRatedProducts();
  }, [fetchTopRatedProducts]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {data.map(_product => (
        <Carousel.Item key={_product._id}>
          <Image src={_product.image} alt={_product.name} fluid />
          <Link href={`/product/${_product._id}`} passHref>
            <Carousel.Caption className="carousel-caption">
              <h2>
                {_product.name} (${_product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel> */}
