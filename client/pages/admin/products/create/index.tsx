import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SEO from '../../../../components/SEO';
import { homeConfig } from '../../../../utils';
import ProductsCreate from '../../../../components/ProductsCreate';

const AdminUserCreatePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <ProductsCreate pageId={id}  />
      </main>
    </>
  );
};
export default AdminUserCreatePage;
