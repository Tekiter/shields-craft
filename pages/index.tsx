import Head from "next/head";
import { ReactElement } from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

export default function Home(): ReactElement {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <Button>Hello world!</Button>
            </div>
        </div>
    );
}
