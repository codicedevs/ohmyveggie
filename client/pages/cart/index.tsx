import SEO from '../../components/SEO';
import { NextPage } from 'next';
import { homeConfig } from '../../utils';
import CartNew from '../../components/CartNew';

const CartPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <CartNew />
      </main>
    </>
  );
};

export default CartPage;
