import { forwardRef, useState } from "react";
import { Grid, Modal, Segment } from "semantic-ui-react";
import { SelectStyleType } from "@/components/panels/SelectStyleType";
import { StaticContent } from "@/components/panels/StaticContent";
import { staticBadge, StaticBadge } from "@/utils/badge";
import { BadgeResult } from "@/components/common/BadgeResult";
import { ShieldsStaticBadge } from "./ShieldsStaticBadge";
import { ExportBadge } from "../common/ExportResult";

interface ExportModalProps {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    badge?: StaticBadge;
}

const ExportModal = (props: ExportModalProps) => {
    return (
        <Modal open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
            <Modal.Header>Export badge</Modal.Header>
            <Modal.Content>
                <ExportBadge url={staticBadge(props.badge)} />
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
        color: "407DBF"
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
                        <StaticContent
                            onChange={(value) => handleChange(value)}
                            label={badge.label}
                            message={badge.message}
                            color={badge.color}
                            labelColor={badge.labelColor}
                        />
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment>
                        <SelectStyleType
                            onChange={(value) => handleChange(value)}
                            style={badge.style}
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});
StaticBadgeCraft.displayName = "StaticBadgeCraft";
