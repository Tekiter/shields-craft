import { FC } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { BadgeColorPicker } from "@/src/components/common/BadgeColorPicker";

type colorTypes = "labelColor" | "color";

export interface SelectColorProps {
    onChange?(e: Partial<Record<colorTypes, string>>): void;
    color?: string;
    labelColor?: string;
}

export const SelectColor: FC<SelectColorProps> = (props) => {
    const handleChange = (type: colorTypes) => (color: string) => {
        if (props.onChange && typeof props.onChange === "function") {
            if (color.startsWith("#")) {
                color = color.substr(1);
            }
            props.onChange({ [type]: color });
        }
    };

    return (
        <Segment basic>
            <Grid columns={2} stackable>
                <Grid.Column>
                    <BadgeColorPicker
                        color={props.labelColor}
                        onChange={handleChange("labelColor")}
                        fluid>
                        Label Color
                    </BadgeColorPicker>
                </Grid.Column>
                <Grid.Column>
                    <BadgeColorPicker color={props.color} onChange={handleChange("color")} fluid>
                        Message Color
                    </BadgeColorPicker>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};
