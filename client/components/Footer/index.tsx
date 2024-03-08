//importing components
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      {/*<Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Elecshop</Col>
        </Row>
      </Container>*/}

      <section className="footerwrapper">
        <div className="div-block-27">
          <div className="div-block-19">
            <div className="div-block-20">
              <img
                src="images/logo.png"
                loading="lazy"
                width={182}
                sizes="(max-width: 479px) 76vw, 182px"
                alt=""
                srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
              />
            </div>
            <div className="columns w-row">
              <div className="column-4 w-col w-col-4">
                <p className="paragraph-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  varius.
                </p>
                <a href="#" className="link-2">
                  ohmyveggie@gmail.com
                </a>
              </div>
              <div className="column w-col w-col-3">
                <ul role="list" className="list-2 w-list-unstyled">
                  <li className="footerlistitem">Inicio</li>
                  <li className="footerlistitem">Nosotros</li>
                  <li className="footerlistitem">Contacto</li>
                </ul>
              </div>
              <div className="column-2 w-col w-col-3">
                <div className="text-block-7">
                  oh my veggie 2024
                  <br />
                  Todos los rerechos reservados
                </div>
              </div>
              <div className="column-3 w-col w-col-2">
                <img
                  src="images/logo2.png"
                  loading="lazy"
                  width={70}
                  alt=""
                  className="image-11"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


    </footer>
  );
};

export default Footer;
