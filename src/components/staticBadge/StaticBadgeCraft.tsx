import { forwardRef, useState } from "react";
import { Grid, Header, Modal, Segment } from "semantic-ui-react";
import { SelectStyleType } from "@/src/components/panels/SelectStyleType";
import { StaticContent } from "@/src/components/panels/StaticContent";
import { staticBadge, StaticBadge } from "@/src/utils/badge";
import { BadgeResult } from "@/src/components/common/BadgeResult";
import { ShieldsStaticBadge } from "./ShieldsStaticBadge";
import { ExportBadge } from "../common/ExportResult";
import { SelectLogo } from "../panels/SelectLogo";

interface ExportModalProps {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    badge?: StaticBadge;
}

const ExportModal = (props: ExportModalProps) => {
    const createdBadge = staticBadge(props.badge);

    return (
        <Modal open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
            <Modal.Header>Export badge</Modal.Header>
            <Modal.Content>
                <ExportBadge url={createdBadge.url} alt={createdBadge.alt} />
            </Modal.Content>
        </Modal>
    );
};

export interface StaticBadgeCraftProps {
    onChange?(style: StaticBadge): void;
}

export const StaticBadgeCraft = forwardRef<HTMLElement, StaticBadgeCraftProps>((props, ref) => {
    const { onChange = () => {} } = props;

    const [badge, setBadge] = useState<StaticBadge>(() => ({
        label: "shields.io",
        message: "badge",
        color: "007EC6",
        labelColor: "555555"
    }));

    const [isExportOpen, setIsExportOpen] = useState(false);

    const handleChange = (values: object) => {
        onChange({ ...badge, ...values });
        setBadge((badge) => ({ ...badge, ...values }));
    };

    return (
        <Grid ref={ref} columns={2} stackable>
            <Grid.Row centered>
                <Grid.Column>
                    <BadgeResult
                        badge={() => <ShieldsStaticBadge {...badge} />}
                        onExport={() => setIsExportOpen(true)}
                    />
                    <ExportModal
                        badge={badge}
                        open={isExportOpen}
                        onClose={() => setIsExportOpen(false)}
                    />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                        <Header>Content</Header>
                        <StaticContent
                            onChange={(value) => handleChange(value)}
                            label={badge.label}
                            message={badge.message}
                            color={badge.color}
                            labelColor={badge.labelColor}
                        />
                        <Header>Style</Header>
                        <SelectStyleType
                            onChange={(value) => handleChange(value)}
                            style={badge.style}
                            vertical
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <Header>Icon</Header>
                        <SelectLogo
                            logo={badge.logo}
                            logoColor={badge.logoColor}
                            logoWidth={badge.logoWidth}
                            onChange={(value) => handleChange(value)}
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});
StaticBadgeCraft.displayName = "StaticBadgeCraft";
