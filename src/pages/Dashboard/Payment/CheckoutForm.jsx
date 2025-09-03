import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transectionId, setTransectionId] = useState("");
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const asiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            asiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            console.log("payment Error ", error);
            setError(error.message);
        } else {
            console.log("payment method", paymentMethod);
            setError("");
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "annonymous",
                        name: user?.displayName || "annonymous"
                    }
                }
            })
        if (confirmError) {
            console.log("confirm error", confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            setTransectionId(paymentIntent.id);
        }

        // Now save payment info in database
        const payment = {
            email: user.email,
            price: totalPrice,
            transectionId: paymentIntent.id,
            date: new Date(), // convert then utc date 
            cartIds: cart.map(item => item._id),
            menuItemIds: cart.map(item => item.menuId),
            status: "Pending"
        }

        const res = await asiosSecure.post('/payments', payment);
        console.log("patment saved", res.data);
        if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully paid the products bill",
                showConfirmButton: false,
                timer: 1000
            });
            refetch();
            navigate("/dashboard/paymentHistory");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-neutral my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            {error && <p className="text-red-600">{error}</p>}
            {transectionId && <p>Your Transection Id is: <span className="text-green-600 font-semibold">{transectionId}</span></p>}
        </form>
    );
};

export default CheckoutForm;