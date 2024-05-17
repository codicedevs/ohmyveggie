import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useTypedSelector, useUserActions } from "../../hooks";
import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";
import { ActionTypes } from "../../state/User/user.action-types";
import { ActionTypes as AT } from "../../state/UI/ui.action-types";
import { useDispatch } from "react-redux";
import RegisterNew from "../RegisterNew";
const Login = ({ visible = false }) =>
  {
  if (!visible) return null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleRegister, setIsVisibleRegister] = useState(false); // para ver o no Register
  const uI = useTypedSelector((state) => state.uI);
  const dispatch = useDispatch();
  const { login } = useUserActions();
  const { loading, error } = useTypedSelector((state) => state.userLogin);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!error || (email.length > 0 && password.length > 0)) {
      login(email, password);
    }
  }
    function registerOn() {
      // saca modal de login y muestra register
      //() => dispatch({type: AT.TOGGLE_LOGIN});
      setIsVisibleRegister(true);
    }
    function forgotPass() {
      dispatch({ type: AT.CLOSE_LOGIN });
      dispatch({ type: AT.OPEN_PASSWORD_RECOVER });
    }
    return (
      <section style={{ display: "flex" }} className="login">
        <div className="div-block-35">
          <img
            src="/images/logo.png"
            loading="lazy"
            sizes="100vw"
            srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
            alt=""
            className="image-10"
          />
          {isErrorVisible ? (
            <Message variant="danger">Debe ingresar un mail correcto</Message>
          ) : null}
          <div className="text-block-15">Bienvenidos a nuestro e-commerce</div>
          <div className="text-block-18">
            Ingrese con email y contraseña {isVisibleRegister}
          </div>
          <div className="form-block w-form">
            {error && <Message variant="danger">{error}</Message>}
            <form
              onSubmit={onSubmitHandler}
              id="email-form"
              name="email-form"
              data-name="Email Form"
              method="get"
              data-wf-page-id="65f86f88047dd365e1261539"
              data-wf-element-id="b748997c-0b44-9ab9-8ad6-544e743bc0fd"
            >
              <label htmlFor="name" className="loginfieldlabel">
                Email
              </label>
              <input
                className="logintextfield w-input"
                maxLength={256}
                name="name"
                data-name="Name"
                placeholder=""
                type="text"
                id="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="name-2" className="loginfieldlabel">
                Contraseña
              </label>
              <input
                className="logintextfield w-input"
                maxLength={256}
                name="name-2"
                data-name="Name 2"
                placeholder=""
                type="password"
                id="name-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="submit-button w-button"
                disabled={loading}
              >
                {loading ? <Loader size={15} color={"white"} /> : "Ingresar"}
              </button>
            </form>
            <div className="w-form-done">
              <div>Gracias! Recibimos tu suscripcion</div>
            </div>
            <div className="w-form-fail">
              <div>Algo salio mal con el formulario!</div>
            </div>
          </div>
          <div className="div-block-36">
            <div className="text-block-17">No tiene cuenta?</div>
            <a
              className="link-3"
              onClick={() => {
                dispatch({ type: AT.OPEN_REGISTER });
                dispatch({ type: AT.CLOSE_LOGIN });
              }}
            >
              Registrese aquí
            </a>
            {/* <Link href="/register">Registrese aquí</Link> */}
          </div>
          <div className="div-block-37">
            <div
              className="text-block-18"
              onClick={forgotPass}
              style={{ cursor: "pointer" }}
            >
              Olvidó su contraseña?
            </div>
          </div>
          {!loading && (
            <div
              data-w-id="61f6a0b0-599f-9b79-f962-7952437987a5"
              className="text-block-19"
              onClick={() => {
                dispatch({ type: AT.CLOSE_LOGIN });
                dispatch({ type: ActionTypes.USER_LOGIN_SUCCESS });
              }}
            >
              X
            </div>
          )}
        </div>
      </section>
    );
};
export default Login;