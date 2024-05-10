import {useState} from 'react';
import Link from 'next/link';
import { useTypedSelector, useUserActions } from '../../hooks';
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import CartNew from '../CartNew';
import { UserAction } from '../../state/User/user.actions';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../state/User/user.action-types';

import { ActionTypes as AT } from '../../state/UI/ui.action-types';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const user = useTypedSelector(state => state.user);

  const uI = useTypedSelector(state => state.uI);


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
  
  const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <div className="div-block-7" style={{justifyContent: 'space-between'}}>
          <div className='socialWrapper d-flex'>
            <div className="div-block-11 d-flex col">
              <img
                src="/images/whatsappIcon.png"
                loading="lazy"
                alt=""
                className="image-2"
              />
              <div className="text-block">341 6 666666</div>
            </div>
            <div className="div-block-11">
              <img
                src="/images/instagramIcon.png"
                loading="lazy"
                alt=""
                className="image-2"
              />
              <div className="text-block">ohmyveggierosario</div>

            </div>
          </div>  
          <div className="text-block" style={{justifyContent: 'right'}}>Envíos a domicilio | Fisherton | Funes | Rosario</div>
        </div>
        <div className="navbar">

          <Link href="/" >
            <img
               src="/images/logo.png"
              loading="lazy"
              width={222}
              sizes="(max-width: 479px) 54vw, 222px"
              alt=""
              srcSet="/images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
              className="image-3"
            />
          </Link>


          <div className={`nav_items ${isOpen && "open"}`}>
            <Link href="/" >
              <p > Inicio </p>
            </Link>
            <Link href="/about" >
              <p > Nosotros </p>
            </Link>
            <div className="buttonswrapper">
              <div className="div-block-31" >
                <div style={{ position: 'relative', width: '80px', }}  onClick={toggleCart}>
                  <Nav.Link>
                    <img
                      src="/images/shopLila.png"
                      loading="lazy"
                      data-w-id="2eff27b6-1120-3c74-74f7-fc6d34090150"
                      alt=""
                      className="image-4-shop"
                      // srcSet="/images/shopLila.png 500w, /images/shopLila.png 800w, /Simages/shopLila.png 830w"

                    />
                    { cartItems.reduce((acc, item) => acc + item.qty, 0) ? 
                            <div className="div-block-30">
                              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </div>
                            :
                            ""
                    }
                  </Nav.Link>
                </div>

                {/* <Button onClick={() => dispatch({type: AT.TOGGLE_LOGIN})}>
                
                </Button> */}

                {user.data ? (
                  <>
                    {/* <img
                      src="/images/loginLila.png"
                      loading="lazy"
                      data-w-id="5021ecdb-f327-aca9-730b-42c1c27b6526"
                      alt=""
                      className="image-4"
                      // srcSet="/images/loginLila.png 500w, images/loginLila.png 800w, images/loginLila.png 830w"
                    /> */}

                    <NavDropdown title={user.data.name} id="username">
                      <Link href="/profile" passHref>
                        <NavDropdown.Item style={{ color: 'black' }}>Perfil</NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item style={{ color: 'black' }} onClick={() => logout()}>
                        Salir
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  // <Link href="/login" passHref>

                    <Nav.Link onClick={() => dispatch({type: AT.TOGGLE_LOGIN})}>
                      {/* <img
                        src="/images/loginLila.png"
                        loading="lazy"
                        data-w-id="5021ecdb-f327-aca9-730b-42c1c27b6526"
                        alt=""
                        className="image-4" */}
                       Ingresar
                    </Nav.Link>

                  // </Link>
                )}

                {user.data && user.data.isAdmin && (
                  <NavDropdown title="Menu administrador" id="username">
                    <Link href="/admin/users" passHref>
                      <NavDropdown.Item style={{ color: 'black' }}>Usuarios</NavDropdown.Item>
                    </Link>
                    <Link href="/admin/products" passHref>
                      <NavDropdown.Item style={{ color: 'black' }}>Productos</NavDropdown.Item>
                    </Link>
                    <Link href="/admin/orders" passHref>
                      <NavDropdown.Item style={{ color: 'black' }}>Ordenes</NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                )}

              </div>
            </div>
          </div>
          <div className={`nav_toggle ${isOpen && "open"}`} onClick={() => setIsOpen(!isOpen)} >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        { isVisibleCart && <CartNew toggleCart={toggleCart}/> }
      </>
    )
    
};

export default Navbar;

/*<nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="navbar-container">
      
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
        <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle} id="menu-toggle" />
        <label  htmlFor="menu-toggle" className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </label>
        <div className="menu-items">
          
          <Link href="/" >
           <p className="nav-link"> Home </p>
          </Link>
          <Link href="/about" >
           <p className="nav-link"> About </p>
          </Link>
          <Link href="/portfolio" >
           <p className="nav-link"> Portfolio </p>
          </Link>
          <Link href="/contact" >
           <p className="nav-link"> Contact </p>
          </Link>
          <div className="buttonswrapper">
                <div className="div-block-31" onClick={toggleCart} > 
                <div style={{position: 'relative'}}>
                <Nav.Link>
                  <img
                    src="../public/images/shopLila.png"
                    loading="lazy"
                    data-w-id="2eff27b6-1120-3c74-74f7-fc6d34090150"
                    alt=""
                    className="image-4"
  
                  />
                  <div className="div-block-30">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</div>
                </Nav.Link>
              </div>
  
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
                          src="../public/images/loginLila.png"
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
          </div>
        </div>
      </nav>
    ); */

