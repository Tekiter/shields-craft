import { forwardRef, SyntheticEvent } from "react";
import { StaticBadge, staticBadge } from "../utils/badge";

export interface ShieldsBadgeProps extends StaticBadge {
  onLoad?(e: SyntheticEvent): void;
  onRequest?({ url: string }): void;
}

export const ShieldsStaticBadge = forwardRef<
  HTMLImageElement,
  ShieldsBadgeProps
>((props, ref) => {
  let {
    label = "",
    message = "",
    color = "blue",
    onLoad,
    onRequest,
    ...styles
  } = props;

  if (onLoad === undefined) {
    onLoad = () => {};
  }

  const badge: StaticBadge = {
    label,
    message,
    color,
    ...styles,
  };

  const badgeURL = staticBadge(badge);

  if (onRequest && onRequest instanceof Function) {
    onRequest({ url: badgeURL });
  }

  return <img ref={ref} src={badgeURL} onLoad={onLoad} />;
});
