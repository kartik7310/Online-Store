import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, // Replace with Sandbox ID if needed
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: "10.00" } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details); // Send captured details back
          });
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
