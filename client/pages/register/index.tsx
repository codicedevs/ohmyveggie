import { NextPage } from 'next';
import Register from '../../components/Register';
import SEO from '../../components/SEO';
import { homeConfig } from '../../utils';
import RegisterNew from '../../components/RegisterNew';

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <RegisterNew />
      </main>
    </>
  );
};
export default LoginPage;
