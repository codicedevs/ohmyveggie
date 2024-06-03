import { useCartActions, useTypedSelector } from '../../hooks';
import { v4 as randomID } from 'uuid';
import Message from '../Message';
import Loader from '../Loader';
import { useRouter } from 'next/router';



const CartNew: React.FC <{toggleCart: () => void}> = (props) => {
    const router = useRouter();
    
    const {
      loading,
      error,
      data: { cartItems },
    } = useTypedSelector(state => state.cart);
    const { data } = useTypedSelector(state => state.user);
    const { addToCart, removeFromCart }  = useCartActions();

    const onCheckoutHandler = () => {
      const redirect = data ? '/shipping' : '/login';    //  acá redirecciona al hacer click en Comprar ahora en funcion de data
      
      props.toggleCart();
      router.push('/shipping');
    };

    function eraseCart() {
      cartItems.forEach((item) => removeFromCart(item.productId)  )
    }

    function addQtyProd(item: any) {  
      if (item.qty + 1 > item.countInStock) {
        <Message variant="danger">'No puede comprar más de ' {item.countInStock} 'productos'</Message>
        return
       }  
      addToCart({
        qty: item.qty + 1,
        productId: item.productId,
      })
    }

    function subtractQtyProd(item: any) {
      if (item.qty < 1 ) { return }  
      addToCart({
        qty: item.qty - 1,
        productId: item.productId,
      })
      if(item.qty === 1) removeFromCart(item.productId)
    }

    return (
        
        <section  className="modalchart">
        <div
          // style={{
          //   WebkitTransform:
          //     "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          //   MozTransform:
          //     "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          //   msTransform:
          //     "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          //   transform:
          //     "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
          // }}
          className="div-block-32"
        >
          <div className="totalitems">
            <div className="div-block-33">
              <img src="images/shop.png" loading="lazy" alt="" className="image-8" />
              <div className="text-block-10 fw-bold" style={{fontWeight: 400}}>{cartItems.reduce((acc, item) => acc + item.qty, 0)} item | Total : $ 
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              </div>
            </div>
            <div
              data-w-id="8545fafe-abce-9b05-f732-86724d5fd31c"
              className="div-block-34"
              onClick={props.toggleCart}
            >
              X
            </div>
          </div>
          <div className="chartprodswrapper">
            {cartItems.length === 0 ?
              <p style={{marginTop: '10px',marginLeft: '25px', fontWeight: 500}}>Su carro está vacío</p>
              :
              cartItems.map(item => (
                <div className="chartproduct">
                  <div className="moreless" style={{fontWeight: 500}}>
                    <div className="morelessbutton more" style={{cursor:"pointer"}} onClick= {() => addQtyProd(item)}>+</div>
                    <div className="text-block-11">{item.qty}</div>
                    <div className="morelessbutton" style={{cursor:"pointer"}} onClick= {() => subtractQtyProd(item)}>-</div>
                  </div>
                  <div className="productdetail">
                    {/* <img
                      src={item.image} 
                      loading="lazy"
                      sizes="100vw"
                      srcSet="images/10619725EA-checkers515Wx515H-p-500.png 500w, images/10619725EA-checkers515Wx515H.png 515w"
                      alt={item.name}
                      className="image-9"
                    /> */}
                    <div className="producttext">
                      <div className="text-block-12 fw-normal">{item.name}</div>
                      <div className="text-block-13 fw-normal">${item.price}x{item.qty}</div>  
                      <div className="text-block-14 fw-normal">${(item.price * item.qty).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="div-block-34 anular" onClick={() => removeFromCart(item.productId)}>X</div>
                </div>
              ))
            }
          </div>

          {cartItems.length > 0 ?
            <div className="buybutton d-flex row gap-3" >
              
              <button className="button w-button" style={{backgroundColor: "#AA3388"}}onClick={eraseCart}> Borrar carrito </button>
              <button className="button w-button" onClick={onCheckoutHandler}>
                Comprar ahora
              </button>
            </div>
            : null
          }  
        </div>
      </section>
    );
  };
  
  export default CartNew;