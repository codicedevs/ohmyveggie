//importing styles
import "../styles/index.css";
import "../styles/bootstrap.min.css";
import "../styles/ohmyveggie.webflow.css";
import "../styles/normalize.css";
import "../styles/webflow.css";

//importing utils
import { useStore } from "../state";
//importing components
import MainLayout from "../layouts/MainLayout";
import { Container, ToastHeader } from "react-bootstrap";
import { Provider } from "react-redux";
//Prueba Toastify
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  const initialState = {
    ...pageProps.initialReduxState,
  };

  const store = useStore(initialState);

  return (
    <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>

    </Provider>
  );
}

export default MyApp;

