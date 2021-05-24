import createContextConnector from "general/createContextConnector";
import React from "react";

const ContextWrapper = React.createContext();

export const connectToContext = createContextConnector(ContextWrapper);

export default ContextWrapper;
