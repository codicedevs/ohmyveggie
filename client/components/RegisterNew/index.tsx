import Link from 'next/link';
import { FormEvent, useState, useEffect } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTypedSelector, useUserActions } from '../../hooks';
import { UserCredentials } from '../../interfaces';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';
import { useDispatch } from 'react-redux';
import { ActionTypes as AT } from '../../state/UI/ui.action-types';
import { toast } from 'react-toastify';


const Register = ({visible= false} ) => {

  if (!visible) return null;

  const initialCredentials = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { register } = useUserActions();
  const { loading, error } = useTypedSelector(state => state.userRegister);

  const [credentials, setCredentials] =
    useState<UserCredentials>(initialCredentials);
  const [message, setMessage] = useState<string | null | string[]>(error);

  useEffect(() => {
    setMessage(error);
  }, [error]);

  const dispatch = useDispatch();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = credentials;

    if (
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      confirmPassword.length < 1
    ) {
      setMessage('All fields are required.');

      return null;
    }

    if (password && password !== confirmPassword) {
      setMessage('Passwords do not match');

      return null;
    }

    register(name, email, password);
    toast.info("Usuario registrado, chequee su mail", {theme: 'colored'})
    dispatch({type: AT.CLOSE_REGISTER })
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
              
              <div className="form-block w-form">
                  {message && (
                      <Message variant="danger">
                          {Array.isArray(message) ? message[0] : message}
                      </Message>
                  )}
                  {loading && <Loader />}

                  <form onSubmit={onSubmitHandler}
                      id="email-form"
                      name="email-form"
                      data-name="Email Form"
                      method="get"
                      data-wf-page-id="65f86f88047dd365e1261539"
                      data-wf-element-id="b748997c-0b44-9ab9-8ad6-544e743bc0fd"
                  >
                      <label htmlFor="name-3" className="loginfieldlabel">
                          Nombre
                      </label>
                      <input
                          className="logintextfield w-input"
                          maxLength={256}
                          name="name-3"
                          data-name="Name-3"
                          placeholder=""
                          type="text"
                          id="name-3"
                          value={credentials.name}
                          onChange={e =>
                              setCredentials({ ...credentials, name: e.target.value })
                          }
                      />

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
                          value={credentials.email}
                          onChange={e =>
                              setCredentials({ ...credentials, email: e.target.value })
                          }
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
                          value={credentials.password}
                          onChange={e =>
                              setCredentials({ ...credentials, password: e.target.value })
                          }
                      />

                      <label htmlFor="name-2" className="loginfieldlabel">
                          Confirmar Contraseña
                      </label>
                      <input
                          className="logintextfield w-input"
                          maxLength={256}
                          name="name-4"
                          data-name="Name 4"
                          placeholder=""
                          type="password"
                          id="name-4"
                          value={credentials.confirmPassword}
                          onChange={e =>
                              setCredentials({
                                  ...credentials,
                                  confirmPassword: e.target.value,
                              })
                          }
                      />

                      <input
                          type="submit"
                          data-wait="Please wait..."
                          className="submit-button w-button"
                          defaultValue="Registrarse"
                      />
                  </form>
                  
              </div>
              <div className="div-block-36">
                  <div className="text-block-17">Ya tiene cuenta?</div>
                   <a  className="link-3" onClick={()=> {dispatch({ type: AT.CLOSE_REGISTER }); dispatch({ type: AT.OPEN_LOGIN })}}>
                      Ingresar
                  </a> 
                 


              </div>
              
              <div
                  data-w-id="61f6a0b0-599f-9b79-f962-7952437987a5"
                  className="text-block-19"
                  onClick={()=> {dispatch({ type: AT.CLOSE_REGISTER })}}
              >
                  X
              </div>
          </div>
      </section>
    
  );
};

export default Register;

