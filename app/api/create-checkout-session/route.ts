/* eslint-disable @typescript-eslint/no-unused-vars, camelcase */
import {env} from "node:process";

import type {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_API_KEY ?? "");

export async function POST(request: NextRequest, response: NextResponse): Promise<Response> {
    const price: Stripe.Response<Stripe.Price> = await stripe.prices.create({
        currency: "sek",
        product_data: {
            name: "my product name",
        },
        unit_amount: 1000, // cost -> 1000 means 1000 cents, means 10 USDs
    });

    const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create({
        customer_email: "mycustomeremail@gmai.com",
        line_items: [
            {
                price: price.id,
                quantity: 2, // will multiply the `price.unit_amount`
            },
        ],
        mode: "payment",
        return_url: `http://localhost:3001/return?session_id={CHECKOUT_SESSION_ID}`,
        ui_mode: "custom",
    });

    return new Response(JSON.stringify({clientSecret: session.client_secret}), {
        headers: {"Content-Type": "application/json"},
        status: 200,
    });

    // res.send({ clientSecret: session.client_secret });

    /*
        const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create({
            cancel_url: "http://localhost:3001/cancel",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "T-shirt",
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3001/success",
        });
    */

    /*
        redirect(session.url ?? "http://localhost:3001/");

        // For example, fetch data from your DB here
        const users = [
            {id: 1, name: "Alice"},
            {id: 2, name: "Bob"},
        ];
        return new Response(JSON.stringify(users), {
            headers: {"Content-Type": "application/json"},
            status: 200,
        });
    */
}
