import React, { useContext } from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import StoreContext from "../context/store-context";

const ProductDetail = ({ data }) => {
  const { addVariantToCart } = useContext(StoreContext);
  return (
    <React.Fragment>
      <SEO
        title={data.shopifyProduct.title}
        description={data.shopifyProduct.description}
      />
      <div className="lesson__details">
        <form
          onSubmit={event => {
            event.preventDefault();
            console.log(data.shopifyProduct.variants[0].shopifyId);
            addVariantToCart(data.shopifyProduct.variants[0].shopifyId, 1);
          }}
        >
          <button
            className="focus:outline-none focus:bg-blue sm:text-lg w-full sm:w-auto bg-blue-dark hover:bg-blue rounded sm:rounded-l-none uppercase text-white font-bold tracking-wide py-3 px-6 sm:py-4"
            type="submit"
          >
            Add to cart
          </button>
        </form>
        <h2 className="text-4xl">{data.shopifyProduct.title}</h2>
        <img
          src={data.shopifyProduct.images[0].originalSrc}
          alt={data.shopifyProduct.title}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: data.shopifyProduct.descriptionHtml,
          }}
        />
      </div>
    </React.Fragment>
  );
};
const CourseTempalte = ({ data }) => {
  return (
    <Layout>
      <ProductDetail data={data} />
    </Layout>
  );
};

export default CourseTempalte;

export const query = graphql`
  query courseQuery($shopifyId: String!) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      title
      images {
        originalSrc
      }
      variants {
        shopifyId
      }
      description
      descriptionHtml
    }
  }
`;
