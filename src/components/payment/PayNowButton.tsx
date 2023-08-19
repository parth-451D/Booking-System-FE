import React from "react";
import StripeCheckout from "react-stripe-checkout";

const PayNowButton = () => {
  const price: number = 456;
  const publishableKey =
    "pk_test_51Kpu6eSGNG2UmeKxPIQSD2nXUycQvqAWjAlFBSw06YycmvCthGFGGqOtrvYdlK7e91PF6v5m3rwWxNv8b3EomBXi0057QcVaB1";

  const onToken = (token: any) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
      <StripeCheckout
        name="Book Your Show"
        label="Pay Now"
        description={`Your total is Rs.${price}`}
        // amount={price*100}
        panelLabel="Pay and Book"
        token={onToken}
        stripeKey={publishableKey}
        image="https://d3pa24hn9l1c2y.cloudfront.net/user/themes/quark/images/icon.svg"
        ComponentClass="div"
        currency="INR"
        // className="reset px-6 py-2 text-white bg-indigo-600 rounded-md hover:cursor-pointer background-transparent font-bold text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      />
  );
};

export default PayNowButton;
