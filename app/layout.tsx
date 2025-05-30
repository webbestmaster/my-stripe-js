import "./css/global.css";
import "./css/service.module.css";

import type {Metadata} from "next";
import {type JSX, StrictMode} from "react";

import type {ReadonlyReactChildrenType} from "../util/type";

export const metadata: Metadata = {
    // taken from the original website
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
};

type RootLayoutPropsType = ReadonlyReactChildrenType;

export default function RootLayout(props: RootLayoutPropsType): JSX.Element {
    const {children} = props;

    return (
        <html lang="en">
            <head></head>
            <body>
                <StrictMode>{children}</StrictMode>
            </body>
        </html>
    );
}
