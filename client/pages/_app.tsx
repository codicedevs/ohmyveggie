//importing styles
import '../styles/index.css';
import '../styles/bootstrap.min.css';
import '../styles/ohmyveggie.webflow.css';
import '../styles/normalize.css';
import '../styles/webflow.css';


//importing utils
import { useStore } from '../state';
import type { AppProps } from 'next/app';
//importing components
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';

function MyApp({ Component, pageProps }: AppProps): any{
  const initialState = {
    ...pageProps.initialReduxState,
  };


  const store = useStore(initialState);

  return (
    <Provider store={store}>
      <MainLayout>
        <div>  <Component {...pageProps} /></div>
      </MainLayout>
    </Provider>
  );
}

export default MyApp;

