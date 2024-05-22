import Link from 'next/link';
import { NavLink } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>

      <section className="footerwrapper">
        <div className="div-block-27">
          <div className="div-block-19">
            <div className="div-block-20">
              <img
                src="/images/logo.png"
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
                El lugar ideal para todo aquel que busque sentirse bien, promoviendo nuevos hábitos a través de la toma de consciencia
                </p>
                <a href="mailto:ohmyveggie@gmail.com" className="link-2">
                  Escribinos un mail
                </a>
              </div>
              <div className="column w-col w-col-3">
                <ul role="list" className="list-2 w-list-unstyled">
                <NavLink href="/" >
                  <li className="footerlistitem">Inicio</li>
                </NavLink> 
                <NavLink href="/about" >
                  <li className="footerlistitem">Nosotros</li>
                </NavLink> 
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
                  src="/images/logo2.png"
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
