import { forwardRef, useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { SelectStyleType } from "@/components/panels/SelectStyleType";
import { StaticContent } from "@/components/panels/StaticContent";
import { staticBadge, StaticBadge } from "@/utils/badge";
import { BadgeResult } from "@/components/common/BadgeResult";
import { ShieldsStaticBadge } from "./ShieldsStaticBadge";
import { ExportBadge } from "@/components/common/ExportResult";
import { SelectColor } from "@/components/panels/SelectColor";

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

    const handleChange = (values: object) => {
        onChange({ ...badge, ...values });
        setBadge((badge) => ({ ...badge, ...values }));
    };

    return (
        <Grid ref={ref} columns={2} stackable>
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
            <Grid.Row>
                <Grid.Column>
                    <BadgeResult badge={() => <ShieldsStaticBadge {...badge} />} />
                </Grid.Column>
                <Grid.Column>
                    <ExportBadge url={staticBadge(badge)} alt={badge.label + " " + badge.message} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});
StaticBadgeCraft.displayName = "StaticBadgeCraft";
