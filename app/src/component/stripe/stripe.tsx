"use client";

import {CheckoutProvider, PaymentElement, useCheckout} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {type FormEventHandler, type JSX, useCallback} from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

async function fetchClientSecret(): Promise<string> {
    const response: Response = await fetch("http://localhost:3001/api/create-checkout-session", {method: "POST"});
    const json: unknown = await response.json();

    if (typeof json !== "object" || json === null) {
        throw new Error("Could not find any checkout session");
    }

    if ("clientSecret" in json) {
        const {clientSecret} = json;

        if (typeof clientSecret !== "string") {
            throw new Error("The clientSecret is not a string");
        }

        return clientSecret;
    }

    throw new Error("The clientSecret is not defined");
}

function CheckoutForm(): JSX.Element {
    const checkout = useCheckout();

    const handleSubmit = useCallback(
        (...args: Parameters<FormEventHandler<HTMLFormElement>>): void => {
            const [event] = args;
            event.preventDefault();

            (async (): Promise<void> => {
                // We don't want to let default form submission happen here,
                // which would refresh the page.
                const result = await checkout.confirm();

                if (result.type === "error") {
                    // Show error to your customer (for example, payment details incomplete)
                    console.log(result.error.message);
                } else {
                    // Your customer will be redirected to your `return_url`. For some payment
                    // methods like iDEAL, your customer will be redirected to an intermediate
                    // site first to authorize the payment, then redirected to the `return_url`.
                }
            })();
        },
        [checkout]
    );

    return (
        <>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button>Submit</button>
            </form>
        </>
    );
}

export function Stripe(): JSX.Element {
    return (
        <>
            <h2>stripe js form - begin</h2>
            <CheckoutProvider options={{fetchClientSecret}} stripe={stripePromise}>
                <CheckoutForm />
            </CheckoutProvider>
            <h2>stripe js form - end</h2>
        </>
    );
}
