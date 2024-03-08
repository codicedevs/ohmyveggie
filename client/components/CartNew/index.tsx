const CartNew: React.FC = () => {
    
  
    return (
        <section  className="modalchart">
        <div
          style={{
            WebkitTransform:
              "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            MozTransform:
              "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            msTransform:
              "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
            transform:
              "translate3d(100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)"
          }}
          className="div-block-32"
        >
          <div className="totalitems">
            <div className="div-block-33">
              <img src="images/shop.png" loading="lazy" alt="" className="image-8" />
              <div className="text-block-10">1 item</div>
            </div>
            <div
              data-w-id="8545fafe-abce-9b05-f732-86724d5fd31c"
              className="div-block-34"
            >
              X
            </div>
          </div>
          <div className="chartprodswrapper">
            <div className="chartproduct">
              <div className="moreless">
                <div className="morelessbutton more">+</div>
                <div className="text-block-11">1</div>
                <div className="morelessbutton">-</div>
              </div>
              <div className="productdetail">
                <img
                  src="images/10619725EA-checkers515Wx515H.png"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="images/10619725EA-checkers515Wx515H-p-500.png 500w, images/10619725EA-checkers515Wx515H.png 515w"
                  alt=""
                  className="image-9"
                />
                <div className="producttext">
                  <div className="text-block-12">Roasted veggie bowl</div>
                  <div className="text-block-13">$4.500,00x1</div>
                  <div className="text-block-14">$4.500,00</div>
                </div>
              </div>
              <div className="div-block-34 anular">X</div>
            </div>
          </div>
          <div className="buybutton">
            <a href="#" className="button w-button">
              Comprar ahora
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default CartNew;