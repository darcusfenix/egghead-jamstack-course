import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import StoreContext, { defaultStoreContext } from "../context/store-context";

import Header from "./header";
import "../css/style.css";

export default class Layout extends React.Component {
  state = {
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, quantity) => {
        console.log("adding to cart");
        if (variantId === "" || !quantity) {
          console.error("Both a size and quantity are required.");
          return;
        }

        this.setState(state => ({
          store: {
            ...state.store,
            adding: true,
          },
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }));
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res,
              },
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) },
        ];

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(res => {
            this.setState(state => ({
              store: {
                ...state.store,
                checkout: res,
              },
            }));
          });
      },
    },
  };
  componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();
  }

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== "undefined";
    const existingCheckoutID = isBrowser
      ? localStorage.getItem("shopify_checkout_id")
      : null;

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem("shopify_checkout_id", checkout.id);
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout,
        },
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem("shopify_checkout_id", null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }
  render() {
    const { children, location } = this.props;
    return (
      <StoreContext.Provider value={this.state.store}>
        <div className="flex flex-col font-sans min-h-screen text-grey-darkest">
          <Header siteTitle=" " />

          <div className="flex flex-col flex-1 md:justify-center max-w-5xl mx-auto px-4 py-8 md:p-8 w-full">
            {children}
          </div>

          <footer className="bg-blue-darkest">
            <div className="flex justify-between max-w-xl mx-auto p-4 md:p-8 text-sm">
              <p className="text-white">
                Created by{" "}
                <a
                  href="https://khaledgarbaya.net"
                  className="font-bold no-underline text-white"
                >
                  Khaled Garbaya
                </a>
              </p>

              <p>
                <a
                  href="https://github.com/Khaledgarbaya/learnjamstack"
                  className="font-bold no-underline text-white"
                >
                  GitHub
                </a>
              </p>
            </div>
          </footer>
        </div>
      </StoreContext.Provider>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
