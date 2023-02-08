import { badgeStyleList, BadgeStylesTypes } from "@/src/utils/badge";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import { useRouter } from "next/router";

export interface SelectStyleTypeProps {
    vertical?: boolean;
    onChange?(e: { style: BadgeStylesTypes }): void;
    style?: BadgeStylesTypes;
}

export const SelectStyleType = forwardRef<HTMLDivElement, SelectStyleTypeProps>((props, ref) => {
    const { vertical = false, onChange } = props;

    const [selected, setSelected] = useState("");
    const { basePath = "" } = useRouter();

    useEffect(() => {
        if (props.style === undefined) {
            setSelected(badgeStyleList[0]);
        }
    }, []);

    const handleClick = useCallback((_, { name }) => {
        if (props.style === undefined) {
            setSelected(name);
        }
        if (onChange && typeof onChange === "function") {
            onChange({ style: name });
        }
    }, []);

    return (
        <Segment ref={ref} basic>
            <Menu
                vertical={vertical}
                fluid
                widths={!vertical ? badgeStyleList.length : undefined}
                size="large">
                {badgeStyleList.map((key) => (
                    <Menu.Item
                        key={`styletype-${key}`}
                        name={key}
                        active={props.style !== undefined ? key === props.style : key === selected}
                        onClick={handleClick}>
                        {vertical ? (
                            <Grid style={{ height: "3.5em" }}>
                                <Grid.Column width={6}>{key}</Grid.Column>
                                <Grid.Column width={10} style={{ textAlign: "right" }}>
                                    <img
                                        src={`${basePath}/badge-samples/${key}.svg`}
                                        alt={`${key} sample`}
                                    />
                                </Grid.Column>
                            </Grid>
                        ) : (
                            key
                        )}
                    </Menu.Item>
                ))}
            </Menu>
        </Segment>
    );
});
SelectStyleType.displayName = "SelectStyleType";
