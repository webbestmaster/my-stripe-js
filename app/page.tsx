import type {Metadata} from "next";
import type {JSX} from "react";

import {Stripe} from "./src/component/stripe/stripe";

export const metadata: Metadata = {
    description: "Home page description",
};

export default function Home(): JSX.Element {
    return (
        <>
            <h1>home page</h1>
            <Stripe />
        </>
    );
}
