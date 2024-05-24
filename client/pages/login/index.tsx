import { NextPage } from 'next';
import SEO from '../../components/SEO';
import { homeConfig } from '../../utils';
import LoginNew from '../../components/LoginNew'

const LoginPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <LoginNew />
      </main>
    </>
  );
};
export default LoginPage;
