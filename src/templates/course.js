import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CourseTempalte = ({ data }) => (
  <Layout>
    <SEO
      title={data.shopifyProduct.title}
      description={data.shopifyProduct.description}
    />
    <div className="lesson__details">
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
  </Layout>
)

export default CourseTempalte

export const query = graphql`
  query courseQuery($shopifyId: String!) {
    shopifyProduct(shopifyId: { eq: $shopifyId }) {
      title
      images {
        originalSrc
      }
      description
      descriptionHtml
    }
  }
`
