import { FC } from "react";

export interface ShieldsBadgeProps {
  label: string;
  message?: string;
  color: string;
}

export const ShieldsStaticBadge: FC<ShieldsBadgeProps> = (props) => {
  const { label = "", message = "", color = "blue" } = props;

  return (
    <div>
      <img src={`https://img.shields.io/badge/${label}-${message}-${color}`} />
    </div>
  );
};
