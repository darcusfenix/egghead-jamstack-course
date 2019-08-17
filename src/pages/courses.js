import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import ShopCard from "../components/shop-card"

const CoursesPage = ({ data: { allShopifyProduct } }) => (
  <Layout>
    <SEO
      title="Learn JAMStack | Course"
      keywords={[
        `gatsby`,
        `jamstack`,
        `react`,
        `netlify`,
        `courses`,
        `contentful`,
      ]}
    />
    <div className="container lg:max-w-screen-lg mx-auto px-6 py-10">
      <div className="mb8">
        <div className="flex items-baseline justify-between border-b-2 border-grey-light mb-10">
          <h2 className="text-base font-display font-bold tracking-wide uppercase py-4 -mb-2px">
            Courses
          </h2>
        </div>
        <div className="flex flex-wrap -mx-3">
          {allShopifyProduct.edges.map(({ node }) => (
            <ShopCard node={node} key={node.shopifyId} />
          ))}
        </div>
      </div>
    </div>
  </Layout>
)

export default CoursesPage
export const shopQuery = graphql`
  {
    allShopifyProduct {
      edges {
        node {
          shopifyId
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            originalSrc
          }
        }
      }
    }
  }
`
