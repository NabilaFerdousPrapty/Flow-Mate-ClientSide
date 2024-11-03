/* eslint-disable react/prop-types */
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const CheckoutForm = ({ bookingData, setOpenPaymentModal, setOpen }) => {
  const { name, price, user } = bookingData;
  const stripe = useStripe();
  const elements = useElements();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const axiosCommon = UseAxiosCommon();
  
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        if (price > 0) {
          const response = await axiosCommon.post("/payments/create-payment-intent", {
            price: price,
          });
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError("Failed to create payment intent. Please try again later.");
      }
    };

    createPaymentIntent();
  }, [axiosCommon, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (stripeError) {
      setError(stripeError.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "Anonymous",
          },
        },
      });

    if (paymentError) {
      setError(paymentError.message);
    } else {
      setError("");
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          transactionId: paymentIntent.id,
          amount: price,
          package_name: name,
          user_email: user.email,
          user_name: user.displayName,
          paymentMethod: paymentMethod.card.brand,
        };

        const res = await axiosCommon.post("/payments/payment", payment);
        setOpenPaymentModal(false);
            setOpen(false);
        if (res.data) {
          
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment has been successfully processed!",
          }).then(() => {
         
           
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: "Your payment has failed. Please try again later.",
          });
        }
      }
    }
  };

  return (
    <div className="border-2 border-[#0047ab] rounded-xl my-4 px-2 py-8">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                margin: "10px",
                fontSize: "16px",
                border: "1px solid #D1A054",
                color: "#424770",
                "::placeholder": {
                  color: "#0047ab",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-lg bg-[#0047ab] text-center p-2 mt-4 w-full mx-auto text-white rounded-md"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600 text-xl my-4">{error}</p>
        {transactionId && (
          <p className="text-green-400 text-xl my-4">
            Payment successful. Payment Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
