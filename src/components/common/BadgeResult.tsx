import { forwardRef, ReactElement } from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export interface BadgeResultProps {
    badge: () => ReactElement;
    onExport?: () => void;
}

export const BadgeResult = forwardRef<HTMLElement, BadgeResultProps>((props, ref) => {
    const { badge = () => <></> } = props;

    function handleExportClick() {
        if (props.onExport && typeof props.onExport === "function") {
            props.onExport();
        }
    }

    return (
        <Segment ref={ref}>
            <div>
                <Header>
                    Crafted Badge{" "}
                    <Button
                        size="small"
                        compact
                        floated="right"
                        color="teal"
                        onClick={handleExportClick}>
                        <Icon name="external alternate" />
                        Export
                    </Button>
                </Header>
            </div>
            <Segment textAlign="center" style={{ minHeight: "65px" }}>
                {badge()}
            </Segment>
        </Segment>
    );
});
BadgeResult.displayName = "BadgeResult";
