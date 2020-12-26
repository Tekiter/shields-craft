import Head from "next/head";
import { ReactElement } from "react";
import { StaticBadgeCraft } from "@/components/staticBadge/StaticBadgeCraft";
import { Container, Header, List, Segment } from "semantic-ui-react";
import githubIcon from "simple-icons/icons/github";
import GithubCorner from "react-github-corner";
import { SVGIcon } from "@/components/misc/SVGIcon";

function HeadingArea() {
    return (
        <Segment textAlign="center" basic inverted style={{ backgroundColor: "#004441" }}>
            <Header
                as="h1"
                style={{
                    fontSize: "5rem",
                    marginTop: "3rem"
                }}>
                Shields Craft
            </Header>
            <Header as="h3" style={{ marginBottom: "2rem" }}>
                Help creating styled{" "}
                <a href="https://shields.io/" target="_blank" rel="noreferrer">
                    Shields.io
                </a>{" "}
                badge.
            </Header>
            <GithubCorner
                href="https://github.com/Tekiter/shields-craft"
                octoColor="#004441"
                bannerColor="#00DED3"
            />
        </Segment>
    );
}

function ContentArea() {
    return (
        <Container style={{ paddingTop: "3rem", paddingBottom: "5rem" }}>
            <StaticBadgeCraft />
        </Container>
    );
}

function FooterArea() {
    return (
        <Segment inverted style={{ minHeight: "200px" }}>
            <Container>
                <p>Shields Craft by Tekiter</p>
                <List link inverted>
                    <List.Item as="a" href="https://github.com/Tekiter/shields-craft">
                        <SVGIcon
                            svg={githubIcon.svg}
                            height="1em"
                            width="1em"
                            style={{ marginRight: "0.3em" }}
                        />
                        Github
                    </List.Item>
                </List>
            </Container>
        </Segment>
    );
}

export default function Home(): ReactElement {
    return (
        <div>
            <Head>
                <title>Shields Craft</title>
            </Head>

            <HeadingArea />
            <ContentArea />

            <FooterArea />
        </div>
    );
}
