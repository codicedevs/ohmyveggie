import Link from 'next/link';
import { FormEvent, useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

import { ActionTypes as AT } from '../../state/UI/ui.action-types';
import { useDispatch } from 'react-redux';

import RegisterNew from '../RegisterNew';

const Login = ({ visible = false }) => {
  if(!visible) return null
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isVisibleRegister, setIsVisibleRegister] = useState(false);   // para ver o no Register

  const uI = useTypedSelector(state => state.uI);
  const dispatch = useDispatch();

  const { login } = useUserActions();
  const { loading, error } = useTypedSelector(state => state.userLogin);

  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!error || (email.length > 0 && password.length > 0)) {
      login(email, password);
      dispatch({type: AT.CLOSE_LOGIN})
    }
  };

  function registerOn() {                      // saca modal de login y muestra register
    //() => dispatch({type: AT.TOGGLE_LOGIN});
    setIsVisibleRegister(true);
  }


  function forgotPass(){
    const checkMail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)[.][a-zA-Z]{2,5}/;
    if (email !== '' && !checkMail.test(email)) {
      dispatch({type: AT.EMAIL_UPDATE_RECOVER, payload: email})
      dispatch({type: AT.OPEN_PASSWORD_RECOVER }); 
      dispatch({type: AT.CLOSE_LOGIN })
    }
    else
      setIsErrorVisible(true);
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
            {isErrorVisible? 
              <Message variant="danger">Debe ingresar un mail correcto</Message>
              : null
            }
            <div className="text-block-15">Bienvenidos a nuestro e-commerce</div>
            <div className="text-block-16">Ingrese con email y contraseña {isVisibleRegister} *</div>
            <div className="form-block w-form">
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <form onSubmit={onSubmitHandler}
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
                  onChange={e => setEmail(e.target.value)}
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
                  type="text"
                  id="name-2"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <input
                  type="submit"
                  data-wait="Please wait..."
                  className="submit-button w-button"
                  defaultValue="Ingresar"
                />
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
                onClick={() => {dispatch({type: AT.OPEN_REGISTER }); dispatch({type: AT.CLOSE_LOGIN })}}

              >
                Registrese aquí
              </a>
              {/* <Link href="/register">Registrese aquí</Link> */}


            </div>
            <div className="div-block-37">
              <div className="text-block-18"
                onClick={forgotPass}
              >
                Olvidó su contraseña?</div>
            </div>
            <div
              data-w-id="61f6a0b0-599f-9b79-f962-7952437987a5"
              className="text-block-19"
              onClick={() => dispatch({ type: AT.CLOSE_LOGIN })}
            >
              X
            </div>
          </div>
        </section>
     

  );
};

export default Login;

/*<FormContainer>
      <h1>Sign In</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="py-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link href="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>*/