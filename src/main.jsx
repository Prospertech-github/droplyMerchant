import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "./assets/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./store";
import ReactQueryProvider from "./providers/react-query.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ReactQueryProvider>
        <App />
        <ToastContainer />
      </ReactQueryProvider>
    </Provider>
  </>
);
