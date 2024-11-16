import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { toast } from "react-toastify";
export const usePaymentGateway = () => {
  const [isLoadingPaymentGateway, setisLoadingPaymentGateway] = useState(false);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razropay failed to load!!");
        return;
      }

      setisLoadingPaymentGateway(true);

      //   toast.success("Script Loaded");

      const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;
      const userToken = localStorage.getItem("clientLoggedToken");

      const response = await axios.get(`${HOSTNAME}/purchase/buy/`, {
        headers: { Authorization: `${userToken}` },
      });

      const { order } = response.data;

      //   toast.success("got response from get request");

      //   console.log("Order - ", order);

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: order.currency,
        name: "Clothing Booking App",
        description: "This is a Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        // this handler func will handle the success payment
        handler: async function (response) {
          const updateTxnAction = await axios.put(
            `${HOSTNAME}/purchase/updateCartstatus/`,
            {
              cartAmount: order.amount / 100,
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
              paymentStatus: "SUCCESSFUL",
            },

            {
              headers: { Authorization: `${userToken}` },
            }
          );
          //   toast.success("Confirmation waiting");

          if (updateTxnAction.data?.message === "Transaction successfull") {
            setisLoadingPaymentGateway(false);
            alert(updateTxnAction.data?.message);

            window.location.replace("/account");
          }
        },

        prefill: {
          name: jwtDecode(localStorage.getItem("clientLoggedToken")).fullName,
          email: jwtDecode(localStorage.getItem("clientLoggedToken")).email,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", async function (response) {
        const updateTxnAction = await axios.put(
          `${HOSTNAME}/purchase/updateCartstatus/`,
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
            paymentStatus: "FAILED",
          },

          {
            headers: { Authorization: `${userToken}` },
          }
        );

        if (updateTxnAction.data?.message === "Transaction Failed") {
          setisLoadingPaymentGateway(false);
          alert("Payment Failed something went wrong");
        }
      });
    } catch (error) {
      console.log("Payment Gateway Error - ", error.message);
    }
  };

  return {
    displayRazorpay,
    isLoadingPaymentGateway,
    setisLoadingPaymentGateway,
  };
};
