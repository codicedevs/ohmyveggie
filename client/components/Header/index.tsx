//importing components
import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';
import SearchBox from '../SearchBox';
import CartNew from '../CartNew';

const Header = () => {
  const { data } = useTypedSelector(state => state.user);
  const { logout } = useUserActions();

  const [isVisibleCart, setIsVisibleCart] = useState(false);

  const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector(state => state.cart);

  function toggleCart() {
    setIsVisibleCart(!isVisibleCart);
  }

  return (
    <div className='header'>
      <Navbar style={{height: '89px'}} variant="dark" expand="lg" collapseOnSelect>
        
        <Link href="/portfolio" >
          <Nav.Link>
            <img
              src="../public/images/logo.png"
              loading="lazy"
              width={222}
              sizes="(max-width: 479px) 54vw, 222px"
              alt=""
              srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
              className="image-3"
            />
          </Nav.Link>
        </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <Link href="/cart" passHref>
                <Nav.Link> */}
              {/* <i className="fas fa-shopping-cart"></i> */}
              <div className="buttonswrapper">
                <div className="div-block-31" onClick={toggleCart} >
                  <img
                    src="images/shopLila.png"
                    loading="lazy"
                    data-w-id="2eff27b6-1120-3c74-74f7-fc6d34090150"
                    alt=""
                    className="image-4"

                  />
                  <div className="div-block-30">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</div>
                </div>
                {/* </Nav.Link>
              </Link> */}
                {data ? (
                  <NavDropdown title={data.name} id="username">
                    <Link href="/profile" passHref>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </Link>
                    <NavDropdown.Item onClick={() => logout()}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Link href="/login" passHref>
                    <Nav.Link>
                      <img
                        src="images/loginLila.png"
                        loading="lazy"
                        data-w-id="5021ecdb-f327-aca9-730b-42c1c27b6526"
                        alt=""
                        className="image-4"
                      /> Sign In
                    </Nav.Link>
                  </Link>
                )}

                {data && data.isAdmin && (
                  <NavDropdown title="Admin" id="username">
                    <Link href="/admin/users" passHref>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </Link>
                    <Link href="/admin/products" passHref>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </Link>
                    <Link href="/admin/orders" passHref>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      
    </div>
  );
};

export default Header;

/* <div className="div-block-7">
        <div className="div-block-11">
          <img
            src="images/whatsappIcon.png"
            loading="lazy"
            alt=""
            className="image-2"
          />
          <div className="text-block">341 6 666666</div>
        </div>
        <div className="div-block-11">
          <img
            src="images/instagramIcon.png"
            loading="lazy"
            alt=""
            className="image-2"
          />
          <div className="text-block">ohmyveggierosario</div>
        </div>
      </div>

        <div className="customnavbar">
          <a href="#" className="brand w-nav-brand">
            <img
              src="images/logo.png"
              loading="lazy"
              width={222}
              sizes="(max-width: 479px) 54vw, 222px"
              alt=""
              srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
              className="image-3"
            />
          </a>
          <div className="div-block-29">
            <div className="linkswrapper">
              <div className="navlink">Inicio</div>
              <div className="navlink">Productos</div>
              <div className="navlink">Nosotros</div>
              <div className="navlink">Contacto</div>
            </div>
            <div className="buttonswrapper">
              <img
                src="images/loginLila.png"
                loading="lazy"
                data-w-id="5021ecdb-f327-aca9-730b-42c1c27b6526"
                alt=""
                className="image-4"
              />
              <div className="div-block-31" onClick={toggleCart} >
                <img
                  src="images/shopLila.png"
                  loading="lazy"
                  data-w-id="2eff27b6-1120-3c74-74f7-fc6d34090150"
                  alt=""
                  className="image-4"
                  
                />
                <div className="div-block-30">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</div>
              </div>
            </div>
          </div>
        
      </div>  

      { isVisibleCart && <CartNew toggleCart={toggleCart}/> }*/
