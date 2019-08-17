import React from "react"
import { Link } from "gatsby"
const Card = ({
  node: {
    title,
    handle,
    images,
    priceRange: {
      minVariantPrice: { amount, currencyCode },
    },
  },
}) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-3 flex flex-col mb-8">
    <Link
      to={`/courses/${handle}`}
      className="no-underline bg-white rounded-lg shadow hover:shadow-raised hover:translateY-2px transition flex-1 flex flex-col overflow-hidden"
    >
      <div>
        <div
          className="bg-cover aspect-ratio-16x9"
          style={{
            height: 200,
            backgroundImage: `url(${images[0].originalSrc}?w=640&h=360&fit=thumb)`,
          }}
        />
        <span className="inline-block text-xl text-white text-center m-1 bg-blue-darker px-5  rounded-full">
          {`${currencyCode} ${amount}`}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="font-display text-black no-underline mb-4">{title}</h3>
      </div>
    </Link>
  </div>
)

export default Card
