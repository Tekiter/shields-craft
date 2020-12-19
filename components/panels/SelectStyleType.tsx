import { badgeStyleList, BadgeStylesTypes } from "@/utils/badge";
import React, { forwardRef, useCallback, useState } from "react";
import { Menu } from "semantic-ui-react";

export interface SelectStyleTypeProps {
  vertical?: boolean;
  onSelect?(style: BadgeStylesTypes): void;
}

export const SelectStyleType = forwardRef<HTMLDivElement, SelectStyleTypeProps>(
  (props, ref) => {
    const { vertical = false, onSelect } = props;

    const [selected, setSelected] = useState(badgeStyleList[0]);

    const handleClick = useCallback((_, { name }) => {
      setSelected(name);
      if (onSelect && typeof onSelect === "function") {
        onSelect(name);
      }
    }, []);
    return (
      <div ref={ref}>
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
      </div>
    );
  }
);
