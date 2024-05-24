import Link from 'next/link';
import { NavLink } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>

      <section className="footerwrapper">
        <div className="div-block-27">
          <div className="div-block-19">
            <div className="div-block-20">
            </div>
            <div className="columns w-row">
              <div className="column-4 w-col w-col-4">
              <img
                src="/images/logo.png"
                loading="lazy"
                width={182}
                sizes="(max-width: 479px) 76vw, 182px"
                alt=""
                srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
              />
                
              
                <p className="paragraph-2 mt-3">
                El lugar ideal para todo aquel que busque sentirse bien, promoviendo nuevos hábitos a través de la toma de consciencia
                </p>
              </div>
              <div className="column w-col w-col-4" style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <ul role="list" className="list-1 w-list-unstyled">
                <NavLink href="/" >
                  <li className="footerlistitem">Inicio</li>
                </NavLink> 
                <NavLink href="/about" >
                  <li className="footerlistitem">Nosotros</li>
                </NavLink> 
                <NavLink href="mailto:ohmyveggie@gmail.com" >
                  <li className="footerlistitem">Envianos un mail</li>
                </NavLink> 
                
                </ul>
              </div>
              <div className="column-2 w-col w-col-4" style={{display: 'flex', flexDirection: 'column'}}>
                <p className="text-block-7" style={{fontWeight: 'bold', textAlign: 'center'}}>
                  oh my veggie 2024 
                </p>
                <p className="text-block-7" style={{fontSize: 12, fontWeight: 400 , textAlign: 'center'}}>
                  Todos los rerechos reservados
                </p>
              <img
                  src="/images/logo2.png"
                  loading="lazy"
                  width={70}
                  alt=""
                  
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
