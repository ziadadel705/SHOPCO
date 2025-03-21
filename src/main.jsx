import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import CounterContextProvider from "./Context/counterContext.jsx";
import TokenContextProvider from "./Context/tokenContext.jsx";
import CartContextProvider from "./Context/cartContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer/>
    <TokenContextProvider>
      <CartContextProvider>
        <CounterContextProvider>
          <App />
        </CounterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
