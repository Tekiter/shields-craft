import { FC } from "react";
import { BadgeStyle, StaticBadge, staticBadge } from "../utils/badge";

export interface ShieldsBadgeProps extends BadgeStyle {
  label: string;
  message?: string;
  color: string;
}

export const ShieldsStaticBadge: FC<ShieldsBadgeProps> = (props) => {
  const { label = "", message = "", color = "blue", ...styles } = props;

  const badge: StaticBadge = {
    label,
    message,
    color,
    ...styles,
  };

  return (
    <div>
      {/* <img src={staticBadge({ label, message, color })} /> */}
      <img src={staticBadge(badge)} />
    </div>
  );
};
