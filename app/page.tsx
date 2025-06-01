import type {Metadata} from "next";
import type {JSX} from "react";

import {Stripe} from "./src/component/stripe/stripe";

export const metadata: Metadata = {
    description: "Home page description",
};

export default function Home(): JSX.Element {
    // const data = await (await fetch("http://localhost:3001/api/payment")).text();

    return (
        <>
            <h1>home page</h1>
            {/*<p>{data}</p>*/}
            <Stripe />
        </>
    );
}
