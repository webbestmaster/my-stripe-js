/*
/!* eslint-disable @typescript-eslint/prefer-readonly-parameter-types, @typescript-eslint/no-unused-vars, camelcase *!/

import {redirect} from "next/navigation";
import type {NextRequest, NextResponse} from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_API_KEY ?? "");

export async function GET(request: NextRequest, response: NextResponse): Promise<Response> {
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
}
*/
