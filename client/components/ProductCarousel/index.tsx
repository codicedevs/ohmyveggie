import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import Carousel from 'react-bootstrap/Carousel';


const ProductCarousel = () => {

  return (
    <Carousel data-bs-theme="dark" fade>
      
      <Carousel.Item>
        <img style={{borderRadius: '0px', objectFit: 'cover'}}
          className="d-block w-100"
          src="/images/Carousel-Web.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img style={{borderRadius: '0px', objectFit: 'cover'}}
          className="d-block w-100"
          src="/images/Carousel-Web2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>

    </Carousel>
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
