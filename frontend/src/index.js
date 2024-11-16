import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/Client/Client.css";
// // Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// // Skelton UI
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { store } from "./Redux/Store";
import { Provider } from "react-redux";
import { SocketProvider } from "./context/SocketContext";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <SocketProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SocketProvider>
      </AppProvider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
