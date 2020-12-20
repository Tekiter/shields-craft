import { forwardRef, ReactElement } from "react";
import { Header, Segment } from "semantic-ui-react";

export interface BadgeResultProps {
    badge: () => ReactElement;
}

export const BadgeResult = forwardRef<HTMLElement, BadgeResultProps>((props, ref) => {
    const { badge = () => <></> } = props;

    return (
        <Segment ref={ref}>
            <Header>Crafted Badge </Header>
            <Segment textAlign="center">{badge()}</Segment>
        </Segment>
    );
});
BadgeResult.displayName = "BadgeResult";
