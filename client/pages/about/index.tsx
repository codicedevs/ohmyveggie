import SEO from '../../components/SEO';
import About from '../../components/About';
import { NextPage } from 'next';
import { homeConfig } from '../../utils';

const AboutPage: NextPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <About/>
      </main>
    </>
  );
};

export default AboutPage;