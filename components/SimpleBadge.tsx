import React from "react";

export type SimpleBadgeStyles =
  | "plastic"
  | "flat"
  | "flat-square"
  | "for-the-badge"
  | "social";

export interface SimpleBadgeProps {
  label?: string;
  message?: string;
  labelColor?: string;
  color?: string;
  style: SimpleBadgeStyles;
}

// export default ({
//   label = "",
//   message = "",
//   labelColor = "white",
//   color = "white",
//   style = "flat",
// }: SimpleBadgeProps) => {
//   return <div>{label}</div>;
// };
export const SimpleBadge: React.FC<SimpleBadgeProps> = (
  props: SimpleBadgeProps
) => {
  return <div>{JSON.stringify(props)}</div>;
};
