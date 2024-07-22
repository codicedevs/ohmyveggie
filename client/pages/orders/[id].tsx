import { NextPage } from "next";
import { useRouter } from "next/router";
import Order from "../../components/Order";
import SEO from "../../components/SEO";
import { homeConfig } from "../../utils";

const OrderPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const key = Number(id);
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5 d-flex" style={{ flexDirection: "column" }}>
        <Order pageId={id} key={key} />
      </main>
    </>
  );
};
export default OrderPage;
