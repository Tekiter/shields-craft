import { AppProps } from "next/dist/next-server/lib/router/router";
import type { ReactElement } from "react";
import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
    return <Component {...pageProps} />;
}

export default MyApp;
