import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import SubscribeForm from "../components/subscribe-form";
import Cart from "../components/cart";
import StoreContext from "../context/store-context";
const CartIndicator = ({ quantity, toggleCart }) => (
  <button
    className="block relative h-8 w-8 z-10"
    aria-label="Shopping cart with 1 items"
    onClick={() => {
      toggleCart();
    }}
  >
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"></path>
    </svg>
    <span className="absolute text-sm inline-block px-2 top-0 text-white rounded-full bg-blue-dark">
      {quantity}
    </span>
  </button>
);
const Header = ({ siteTitle, showCart }) => {
  const { checkout } = useContext(StoreContext);
  const [openCart, setOpenCart] = useState(false);
  const toggleCart = () => {
    setOpenCart(!openCart);
  };
  const itemsInCart = checkout.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <div className="bg-blue-darkest">
      <Cart open={openCart} toggleCart={toggleCart} />
      <div className="container lg:max-w-screen-lg mx-auto flex flex-row-reverse p-4">
        {showCart && (
          <CartIndicator quantity={itemsInCart} toggleCart={toggleCart} />
        )}
      </div>
      <div className="container lg:max-w-screen-lg mx-auto px-6 text-white">
        <img
          src="/logo.svg"
          className="mb-12 block"
          width="200"
          alt="A JAM sandiwch wearing glasses"
        />
        <div className="mb-12">
          <h1 className="font-display font-semibold text-white text-4xl sm:text-5xl md:text-6xl mb-4 leading-none">
            Static sites can do so much more!
          </h1>
          <p className="text-m sm:text-xl leading-normal max-w-lg">
            Learn how build apps that combine the performance and workflow
            benefits of static sites with the flexibility and power of
            server-driven sites.
          </p>
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
