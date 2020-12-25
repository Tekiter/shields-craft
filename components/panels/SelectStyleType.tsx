import { badgeStyleList, BadgeStylesTypes } from "@/utils/badge";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { Menu, Segment } from "semantic-ui-react";

export interface SelectStyleTypeProps {
    vertical?: boolean;
    onChange?(e: { style: BadgeStylesTypes }): void;
    style?: BadgeStylesTypes;
}

export const SelectStyleType = forwardRef<HTMLDivElement, SelectStyleTypeProps>((props, ref) => {
    const { vertical = false, onChange } = props;

    const [selected, setSelected] = useState("");

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
            <Menu vertical={vertical} fluid widths={badgeStyleList.length}>
                {badgeStyleList.map((key) => (
                    <Menu.Item
                        key={`styletype-${key}`}
                        name={key}
                        active={props.style !== undefined ? key === props.style : key === selected}
                        onClick={handleClick}>
                        {key}
                    </Menu.Item>
                ))}
            </Menu>
        </Segment>
    );
});
SelectStyleType.displayName = "SelectStyleType";
