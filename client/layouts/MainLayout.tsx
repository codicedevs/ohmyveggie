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
import ResetPassword from '../components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { NavLink } from 'react-bootstrap';


const MainLayout: React.FC = ({ children }) => {
  useReset();

  const accessToken = useLocalStorage('', 'accessToken');

  const uI = useTypedSelector(state => state.uI);

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
      <a href="https://wa.me/+5493416008824">
      <img src="\images\whatsappF.png" alt="what" className="btn-wsp" />
      </a>
        
      <HeaderNew />
      <LoginNew visible ={uI.isLoginVisible}/>
      <Register visible ={uI.isRegisterVisible}/>
      <PasswordRecover visible ={uI.isPasswordRecoverVisible}/>
      <ResetPassword visible ={uI.isResetPasswordVisible}/>
      <ToastContainer 
        autoClose={1500}
        position="top-center"
        
      />
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
