import { ChangeEvent, forwardRef, useCallback, useState } from "react";
import { Checkbox, Grid, Header, Input, Segment } from "semantic-ui-react";
import { BadgeColorPicker } from "../common/BadgeColorPicker";

type paramTypes = "label" | "message" | "labelColor" | "color";

export interface StaticContentProps {
    onChange?(e: Partial<Record<paramTypes, string>>): void;
    label?: string;
    message?: string;
    color?: string;
    labelColor?: string;
}

export const StaticContent = forwardRef<Element, StaticContentProps>(
    ({ onChange, ...props }, ref) => {
        const [label, setLabel] = useState("shields.io");
        const [message, setMessage] = useState("badge");
        const [onlyMessage, setOnlyMessage] = useState(false);

        const handleLabel = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setLabel(e.target.value);
                if (typeof onChange === "function") {
                    onChange({ label: e.target.value, message });
                }
            },
            [label, message]
        );

        const handleMessage = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setMessage(e.target.value);
                if (typeof onChange === "function") {
                    onChange({ label, message: e.target.value });
                }
            },
            [label, message]
        );

        const handleColor = (type: string) => (color: string) => {
            if (typeof onChange === "function") {
                if (color.startsWith("#")) {
                    color = color.substr(1);
                }
                onChange({ [type]: color });
            }
        };

        const handleTwopartChange = (_, { checked }) => {
            if (checked) {
                setOnlyMessage(true);
                setLabel("");
                if (typeof onChange === "function") {
                    onChange({ label: "" });
                }
            } else {
                setOnlyMessage(false);
            }
        };

        return (
            <Segment ref={ref} basic>
                <Grid>
                    {!onlyMessage ? (
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Header as="h5">Label (left side)</Header>
                            </Grid.Column>
                            <Grid.Column tablet={16} computer={8}>
                                <Input fluid value={props.label} onChange={handleLabel}></Input>
                            </Grid.Column>
                            <Grid.Column tablet={16} computer={8}>
                                <BadgeColorPicker
                                    color={props.labelColor}
                                    onChange={handleColor("labelColor")}
                                    fluid>
                                    Select Color
                                </BadgeColorPicker>
                            </Grid.Column>
                        </Grid.Row>
                    ) : null}

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header as="h5">Message {onlyMessage ? "" : "(right side)"}</Header>
                        </Grid.Column>
                        <Grid.Column tablet={16} computer={8}>
                            <Input fluid value={props.message} onChange={handleMessage}></Input>
                        </Grid.Column>
                        <Grid.Column tablet={16} computer={8}>
                            <BadgeColorPicker
                                color={props.color}
                                onChange={handleColor("color")}
                                fluid>
                                Select Color
                            </BadgeColorPicker>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Segment basic>
                    <Checkbox
                        label="Only message"
                        checked={onlyMessage}
                        onChange={handleTwopartChange}
                    />
                </Segment>
            </Segment>
        );
    }
);
StaticContent.displayName = "StaticContent";
