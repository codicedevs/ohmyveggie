import { NextPage } from 'next';
import PlaceOrder from '../../components/PlaceOrder';
import SEO from '../../components/SEO';
import { homeConfig } from '../../utils';

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-4 d-flex" style={{flexDirection: 'column'}}>
        <PlaceOrder />
      </main>
    </>
  );
};
export default OrderPage;
