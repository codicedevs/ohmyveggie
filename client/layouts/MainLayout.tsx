import HeaderNew from '../components/HeaderNew';
import Footer from '../components/Footer';
import CartNew from '../components/CartNew';
import LoginNew from '../components/LoginNew';
import {
  useCartActions,
  useLocalStorage,
  useReset,
  useUserActions,
} from '../hooks';
import { useEffect } from 'react';
import { useTypedSelector} from '.././hooks';
import Register from '../components/RegisterNew';
import PasswordRecover from '../components/PasswordRecover';


const MainLayout: React.FC = ({ children }) => {
  useReset();

  const accessToken = useLocalStorage('', 'accessToken');

  const uI = useTypedSelector(state => state.uI);
  console.log('isvisible:', uI);

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
      <LoginNew visible ={uI.isLoginVisible}/>
      <Register visible ={uI.isRegisterVisible}/>
      <PasswordRecover visible ={uI.isPasswordRecoverVisible}/>
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
