import { useState } from "react";
import Link from "next/link";
import { useTypedSelector, useUserActions } from "../../hooks";
import { Button, Nav, NavDropdown, NavLink } from "react-bootstrap";
import CartNew from "../CartNew";
import { UserAction } from "../../state/User/user.actions";
import { useDispatch } from "react-redux";
import { ActionTypes } from "../../state/User/user.action-types";
import { ActionTypes as AT } from "../../state/UI/ui.action-types";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const user = useTypedSelector((state) => state.user);

  const uI = useTypedSelector((state) => state.uI);

  const { logout } = useUserActions();

  const [isVisibleCart, setIsVisibleCart] = useState(false);

  const {
    loading,
    error,
    data: { cartItems },
  } = useTypedSelector((state) => state.cart);

  function toggleCart() {
    setIsVisibleCart(!isVisibleCart);
  }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="div-block-7" style={{ justifyContent: "space-arround" }}>
        <div className="socialWrapper d-flex">
          <NavLink href="https://wa.me/5493416008824" style={{ padding: 0 }}>
            <div
              className="div-block-11 gap-2 "
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <img
                src="/images/whatsappIcon.png"
                loading="lazy"
                alt=""
                className="image-2"
              />
              3416-008824
            </div>
          </NavLink>
          <NavLink
            href="https://www.instagram.com/ohmyveggierosario/?hl=en"
            style={{ padding: 0 }}
          >
            <div
              className="div-block-11 gap-2"
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <img
                src="/images/instagramIcon.png"
                loading="lazy"
                alt=""
                className="image-2"
              />
              <div className="text-block">ohmyveggierosario</div>
            </div>
          </NavLink>
        </div>
        <div
          className="text-block"
          id="citiesHeader"
          style={{ justifyContent: "right" }}
        >
          Envíos a domicilio | Fisherton | Funes | Rosario
        </div>
      </div>
      <div className="navbar">
        <Link href="/">
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
        <div className="cartItemsNew">
          <div className={`nav_items ${isOpen && "open"}`}>
            <Link href="/">
              <p> Inicio </p>
            </Link>
            <Link href="/about">
              <p> Nosotros </p>
            </Link>
            <div className="buttonswrapper">
              <div className="div-block-31">
                {user.data ? (
                  <>
                    <NavDropdown title={user.data.name} id="username">
                      <Link href="/profile" passHref>
                        <NavDropdown.Item style={{ color: "black" }}>
                          Perfil
                        </NavDropdown.Item>
                      </Link>
                      <NavDropdown.Item
                        style={{ color: "black" }}
                        onClick={() => logout()}
                      >
                        Salir
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <Nav.Link onClick={() => dispatch({ type: AT.TOGGLE_LOGIN })}>
                    Ingresar
                  </Nav.Link>

                  // </Link>
                )}

                {user.data && user.data.isAdmin && (
                  <NavDropdown title="Menu administrador" id="username">
                    <Link href="/admin/users" passHref>
                      <NavDropdown.Item style={{ color: "black" }}>
                        Usuarios
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/admin/products" passHref>
                      <NavDropdown.Item style={{ color: "black" }}>
                        Productos
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/admin/categories" passHref>
                      <NavDropdown.Item style={{ color: "black" }}>
                        Categorias
                      </NavDropdown.Item>
                    </Link>
                    <Link href="/admin/orders" passHref>
                      <NavDropdown.Item style={{ color: "black" }}>
                        Ordenes
                      </NavDropdown.Item>
                    </Link>
                  </NavDropdown>
                )}
              </div>
            </div>
            <div className="cartIcon"></div>
          </div>
          <div
            className={`nav_toggle ${isOpen && "open"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <Nav.Link>
            <div onClick={toggleCart}>
              {cartItems.reduce((acc, item) => acc + item.qty, 0) ? (
                <div className="div-block-30">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </div>
              ) : (
                ""
              )}
              <img
                src="/images/shopLila.png"
                loading="lazy"
                data-w-id="2eff27b6-1120-3c74-74f7-fc6d34090150"
                alt=""
                className="image-4-shop"
                // srcSet="/images/shopLila.png 500w, /images/shopLila.png 800w, /Simages/shopLila.png 830w"
              />
            </div>
          </Nav.Link>
        </div>
        {isVisibleCart && <CartNew toggleCart={toggleCart} />}
      </div>
    </>
  );
};

export default Navbar;
