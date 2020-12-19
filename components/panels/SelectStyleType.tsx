import { badgeStyleList, BadgeStylesTypes } from "@/utils/badge";
import React, { forwardRef, useCallback, useState } from "react";
import { Header, Menu, Segment } from "semantic-ui-react";

export interface SelectStyleTypeProps {
  vertical?: boolean;
  onChange?(e: { style: BadgeStylesTypes }): void;
}

export const SelectStyleType = forwardRef<HTMLDivElement, SelectStyleTypeProps>(
  (props, ref) => {
    const { vertical = false, onChange } = props;

    const [selected, setSelected] = useState(badgeStyleList[0]);

    const handleClick = useCallback((_, { name }) => {
      setSelected(name);
      if (onChange && typeof onChange === "function") {
        onChange({ style: name });
      }
    }, []);
    return (
      <Segment ref={ref}>
        <Header as="h3">Style</Header>
        <Menu vertical={vertical}>
          {badgeStyleList.map((key) => (
            <Menu.Item
              key={`styletype-${key}`}
              name={key}
              active={selected === key}
              onClick={handleClick}
            >
              {key}
            </Menu.Item>
          ))}
        </Menu>
      </Segment>
    );
  }
);
