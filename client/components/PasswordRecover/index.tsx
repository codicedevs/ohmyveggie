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
  const [password, setPassword] = useState("");

  const [isVisibleRegister, setIsVisibleRegister] = useState(false); // para ver o no Register

  const uI = useTypedSelector((state) => state.uI);
  const dispatch = useDispatch();

  const { login, recoverPassword } = useUserActions();
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

// const PasswordRecover = ({visible= false} ) => {

//   if (!visible) return null;

//   const [recover, setRecover] = useState<UIRecover>({
//     codigo: 0,
//     nuevaContraseña: '',
//     confNuevaContraseña: '',
//   });

//   const [isAlertVisible, setIsAlertVisible] = useState(true);

//   const { register } = useUserActions();
//   const { loading, error } = useTypedSelector(state => state.userRegister);

//   const uI = useTypedSelector(state => state.uI);

//     const [message, setMessage] = useState<string | null | string[]>(error);

//   useEffect(() => {
//     setMessage(error);
//   }, [error]);

//   const dispatch = useDispatch();

//   const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { codigo, nuevaContraseña, confNuevaContraseña } = recover;

//     if (
//       codigo == 0 ||
//       nuevaContraseña.length < 1 ||
//       confNuevaContraseña.length < 1
//     ) {
//       setMessage('Completar todos los campos.');

//       return null;
//     }

//     if (nuevaContraseña && nuevaContraseña !== confNuevaContraseña) {
//        setMessage('Las contraseñas no coinciden');

//        return null;
//     }

//     setMessage('');

//     console.log('pasó', recover);

//     //register(name, email, password);
//   };

//   const setDataForm = (e: any) => {
//     setRecover({
//         ...recover,
//         [e.target.name]: e.target.value
//     });
//   }

//   return (

//     <section style={{ display: "flex" }} className="login">

//           { isAlertVisible?
//                 <Alert style={{width: '50%'}} variant="success">
//                     <Alert.Heading>Atención</Alert.Heading>
//                     <p>
//                         Se le enviará un email a <b>{uI.emailForRecover}</b> con un código para cambiar su contraseña
//                     </p>
//                     <hr />
//                     <div className="d-flex justify-content-end">
//                         <Button
//                             onClick={() => setIsAlertVisible(false)}
//                             variant="outline-success"
//                         >
//                             Continuar
//                         </Button>

//                         <Button
//                             onClick={()=> {dispatch({ type: AT.CLOSE_PASSWORD_RECOVER })}}
//                             variant="outline-success"
//                         >
//                             Cancelar
//                         </Button>

//                     </div>
//                 </Alert>
//             : null
//           }

//           { !isAlertVisible?
//             <div className="div-block-35">
//                 <img
//                     src="/images/logo.png"
//                     loading="lazy"
//                     sizes="100vw"
//                     srcSet="images/logo-p-500.png 500w, images/logo-p-800.png 800w, images/logo.png 830w"
//                     alt=""
//                     className="image-10"
//                 />

//                 <div className="form-block w-form">
//                     {message && (
//                         <Message variant="danger">
//                             {Array.isArray(message) ? message[0] : message}
//                         </Message>
//                     )}
//                     {loading && <Loader />}

//                     <form onSubmit={onSubmitHandler}
//                         id="email-form"
//                         name="email-form"
//                         data-name="Email Form"
//                         method="get"
//                         data-wf-page-id="65f86f88047dd365e1261539"
//                         data-wf-element-id="b748997c-0b44-9ab9-8ad6-544e743bc0fd"
//                     >

//                         <label htmlFor="name" className="loginfieldlabel">
//                             Email
//                         </label>
//                         <text
//                             className="logintextfield w-input"
//                             // name="name"
//                             // data-name="Name"
//                             type="text"
//                             //id="name"
//                         >
//                             {uI.emailForRecover}
//                         </text>

//                           <label htmlFor="name-3" className="loginfieldlabel">
//                               Código
//                           </label>
//                           <input
//                               className="logintextfield w-input"
//                               maxLength={256}
//                               name="codigo"
//                               data-name="Name-3"
//                               placeholder=""
//                               type="text"
//                               id="name-3"
//                               value={recover.codigo}
//                               onChange={e => setDataForm(e) }
//                           />

//                         <label htmlFor="name-2" className="loginfieldlabel">
//                             Nueva contraseña
//                         </label>
//                         <input
//                             className="logintextfield w-input"
//                             maxLength={256}
//                             name="nuevaContraseña"
//                             data-name="Name 2"
//                             placeholder=""
//                             type="text"
//                             id="name-2"
//                             value={recover.nuevaContraseña}
//                             onChange={e => setDataForm(e) }
//                         />

//                         <label htmlFor="name-2" className="loginfieldlabel">
//                             Confirmar nueva contraseña
//                         </label>
//                         <input
//                             className="logintextfield w-input"
//                             maxLength={256}
//                             name="confNuevaContraseña"
//                             data-name="Name 4"
//                             placeholder=""
//                             type="text"
//                             id="name-4"
//                             value={recover.confNuevaContraseña}
//                             onChange={e => setDataForm(e) }
//                         />

//                         <input
//                             type="submit"
//                             data-wait="Please wait..."
//                             className="submit-button w-button"
//                             defaultValue="Registrarse"
//                         />
//                     </form>

//                 </div>
//                 <div className="div-block-36">
//                     <div className="text-block-17">Ya tiene cuenta?</div>
//                     <a  className="link-3" onClick={()=> {dispatch({ type: AT.CLOSE_PASSWORD_RECOVER }); dispatch({ type: AT.OPEN_LOGIN })}}>
//                         Ingresar
//                     </a>
//                     {/* <Link href="/login">Ingresar</Link> */}

//                 </div>
//                 {/* <div className="div-block-37">
//                     <div className="text-block-18">Olvidó su contraseña?</div>
//                 </div> */}
//                 <div
//                     data-w-id="61f6a0b0-599f-9b79-f962-7952437987a5"
//                     className="text-block-19"
//                     onClick={()=> {dispatch({ type: AT.CLOSE_PASSWORD_RECOVER })}}
//                 >
//                     X
//                 </div>
//             </div>
//             : null
//         }
//       </section>

//   );
// };