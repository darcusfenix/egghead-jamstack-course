import React, { useContext } from "react";
import StoreContext from "../context/store-context";
const Cart = ({ open, toggleCart }) => {
  const { client, checkout, removeLineItem } = useContext(StoreContext);
  return (
    <div
      style={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "all .3s ease",
      }}
      className="shadow bg-white fixed h-full inset-y-0 right-0 w-1/3 min-w-36 p-4 z-20"
    >
      <button
        onClick={() => {
          toggleCart();
        }}
        className="text-xl px-4 py-2 bg-blue-dark absolute top-0 right-0 text-white"
      >
        &times;
      </button>
      <h2 className="px-2 bg-blue-dark text-white text-3xl -mx-4">Your Cart</h2>
      <ul className="my-5">
        {checkout.lineItems.map(item => (
          <li key={item.id} className="px-4 bg-gray-200 -mx-4">
            <div className="flex items-center ">
              <div className="relative">
                <img
                  className="w-16 h-16"
                  src={item.variant.image.src}
                  alt={item.title}
                />
                <span className="absolute top-0 right-0 -mr-4 -mt-2 text-white rounded-full bg-blue-dark px-2">
                  {item.quantity}
                </span>
              </div>
              <h4 className="px-2 text-sm">{item.title}</h4>
            </div>
            <div className="text-right">
              <button
                onClick={async () => {
                  await removeLineItem(client, checkout.id, item.id);
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <span className="block mb-5">
        <strong>subtotal:</strong> $ {checkout.subtotalPrice}
      </span>

      <button
        className="focus:outline-none focus:bg-blue sm:text-lg w-full sm:w-auto bg-blue-dark hover:bg-blue rounded uppercase text-white font-bold tracking-wide py-3 px-6 sm:py-4"
        onClick={() => {
          window.location = checkout.webUrl;
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
