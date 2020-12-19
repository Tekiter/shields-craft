import Head from "next/head";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";

export default function Home() {
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
