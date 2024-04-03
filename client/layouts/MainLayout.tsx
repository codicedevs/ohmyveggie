import Header from '../components/Header';
import HeaderNew from '../components/HeaderNew';
import Footer from '../components/Footer';
import CartNew from '../components/CartNew';
import {
  useCartActions,
  useLocalStorage,
  useReset,
  useUserActions,
} from '../hooks';
import { useEffect } from 'react';

const MainLayout: React.FC = ({ children }) => {
  useReset();

  const accessToken = useLocalStorage('', 'accessToken');

  const { getCurrentUser } = useUserActions();
  const { getCart } = useCartActions();

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (accessToken.length > 0) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser]);

  return (
    <>
      <HeaderNew />
        {children}
      <Footer />
    </>
  );
};

export default MainLayout;

{/*<div className="app__container">
      <Header />
      {children}
      <Footer />
  </div>*/}
