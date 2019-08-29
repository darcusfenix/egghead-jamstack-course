import React from "react";

export const defaultInterfaceContext = {
  cartStatus: "initial",
  toggleCart: () => {},
};

export default React.createContext(defaultInterfaceContext);
