import type { ReactElement } from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return <Component {...pageProps} />;
}

export default MyApp;
