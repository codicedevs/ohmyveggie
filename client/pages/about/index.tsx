import SEO from '../../components/SEO';
import About from '../../components/About';
import { NextPage } from 'next';
import { aboutConfig } from '../../utils';

const AboutPage: NextPage = () => {
  return (
    <>
      <SEO {...aboutConfig} />
      <main className="wrapper py-5">
        <About/>
      </main>
    </>
  );
};

export default AboutPage;