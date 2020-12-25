import Head from "next/head";
import { ReactElement } from "react";
import { StaticBadgeCraft } from "@/components/staticBadge/StaticBadgeCraft";
import { Container, Header, Segment } from "semantic-ui-react";

function HeadingArea() {
    return (
        <Segment textAlign="center" basic inverted style={{ backgroundColor: "#004441" }}>
            <Header
                as="h1"
                style={{
                    fontSize: "5rem",
                    marginTop: "3rem"
                }}>
                Badge Craft
            </Header>
            <Header as="h4" style={{ marginBottom: "3rem" }}>
                by. Tekiter
            </Header>
            <Header as="h3" style={{ marginBottom: "2rem" }}>
                Help creating styled <a href="https://shields.io/">Shields.io</a> badge.
            </Header>
        </Segment>
    );
}

function ContentArea() {
    return (
        <Container>
            <StaticBadgeCraft />
        </Container>
    );
}

export default function Home(): ReactElement {
    return (
        <div>
            <Head>
                <title>Badge Craft</title>
            </Head>

            <HeadingArea />
            <ContentArea />
        </div>
    );
}
