import { UserCredentials, UIRecover } from "../../interfaces";
import Link from "next/link";
import { FormEvent, useState, useEffect } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { useTypedSelector, useUserActions } from "../../hooks";
import FormContainer from "../FormContainer";
import Loader from "../Loader";
import Message from "../Message";
import { ActionTypes as AT } from "../../state/UI/ui.action-types";
import { useDispatch } from "react-redux";
import RegisterNew from "../RegisterNew";

const PasswordRecover = ({ visible = false }) => {
  
  if (!visible) return null;
  const [email, setEmail] = useState("");

  const uI = useTypedSelector((state) => state.uI);
  const dispatch = useDispatch();

  const { recoverPassword } = useUserActions();
  const { loading, error } = useTypedSelector((state) => state.userLogin);

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    recoverPassword(email);

    if (!error || email.length > 0) {
        
    }
  };

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
        <div className="text-block-12">Complete con su mail de usuario</div>
        <div className="form-block w-form">
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <form
            onSubmit={onSubmitHandler}
            id="email-form"
            name="email-form"
            data-name="Email Form"
            method="get"
            data-wf-page-id="65f86f88047dd365e1261539"
            data-wf-element-id="b748997c-0b44-9ab9-8ad6-544e743bc0fd"
          >
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
              style={{ marginTop: 20 }}
            />
            <input
              type="submit"
              data-wait="Please wait..."
              className="submit-button w-button"
              defaultValue="Ingresar"
            />
          </form>

          <div className="w-form-fail">
            <div>Algo salio mal con el formulario!</div>
          </div>
        </div>

        <div
          data-w-id="61f6a0b0-599f-9b79-f962-7952437987a5"
          className="text-block-19"
          onClick={() => dispatch({ type: AT.CLOSE_PASSWORD_RECOVER })}
        >
          X
        </div>
      </div>
      
    </section>
  );
};

export default PasswordRecover;
