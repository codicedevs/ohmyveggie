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
import { ToastProvider } from "../components/Toast/toastContext";

function MyApp({ Component, pageProps }) {
  const initialState = {
    ...pageProps.initialReduxState,
  };

  const store = useStore(initialState);

  return (
    <Provider store={store}>
      <ToastProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ToastProvider>
    </Provider>
  );
}

export default MyApp;

