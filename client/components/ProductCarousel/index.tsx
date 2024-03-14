import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader  
import { Carousel } from 'react-responsive-carousel'; 





//"../images/slide1.jpg"

const ProductCarousel = () => {

  return (

    // <Carousel>
    //   <div>
    //     <img src="../images/slide1.jpg" />
    //     <p className="legend">Legend 1</p>
    //   </div>
    //   <div>
    //     <img src="../images/slide2.jpg" />
    //     <p className="legend">Legend 2</p>
    //   </div>
      
    // </Carousel>
    <h1>Acá va el slider</h1>

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
