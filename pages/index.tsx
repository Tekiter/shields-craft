import Head from "next/head";
import { CSSProperties, ReactElement } from "react";
import { StaticBadgeCraft } from "@/components/staticBadge/StaticBadgeCraft";
import { Container, Header, List, Segment } from "semantic-ui-react";
import githubIcon from "simple-icons/icons/github";
import GithubCorner from "react-github-corner";
import { SVGIcon } from "@/components/misc/SVGIcon";
import { useRouter } from "next/router";

const TITLE = "Shields Craft";

function TitleImage({ style }: { style?: CSSProperties }) {
    const { basePath = "" } = useRouter();

    return <img src={`${basePath}/ShieldsCraft.svg`} alt={TITLE} style={style} />;
}

function HeadingArea() {
    return (
        <Segment textAlign="center" basic inverted style={{ backgroundColor: "#004441" }}>
            <Header
                as="h1"
                style={{
                    marginTop: "3rem"
                }}>
                <TitleImage style={{ height: "7rem", width: "auto" }} />
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
                <p>{TITLE} by Tekiter</p>
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
                <title>{TITLE}</title>
            </Head>

            <HeadingArea />
            <ContentArea />

            <FooterArea />
        </div>
    );
}
