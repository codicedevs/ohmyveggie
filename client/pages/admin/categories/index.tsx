import React from "react";
import CategoriesList from "../../../components/CategoriesList";
import SEO from "../../../components/SEO";
import { homeConfig } from "../../../utils";

const CategoriesPage = () => {
  return (
    <>
      <SEO {...homeConfig} />
      <main className="wrapper py-5">
        <CategoriesList />;
      </main>
    </>
  );
};
export default CategoriesPage;
