export const badgeStyleList = [
  "flat",
  "flat-square",
  "for-the-badge",
  "plastic",
  "social",
] as const;

export type BadgeStylesTypes = typeof badgeStyleList[number];

export interface BadgeStyle {
  style?: BadgeStylesTypes;
  logo?: string;
  label?: string;
  logoColor?: string;
  logoWidth?: number;
  link?: string;
  labelColor?: string;
  color?: string;
  cacheSeconds?: number;
}

export interface StaticBadge extends BadgeStyle {
  label: string;
  message?: string;
  color: string;
}

function makeQuery(obj: { [key: string]: any }): string {
  const arr = [];

  for (let key in obj) {
    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key] + "")}`);
  }

  return arr.join("&");
}

function escapeParam(value: string): string {
  let s = encodeURIComponent(value);
  s = s.replace(/-/g, "--");
  s = s.replace(/_/g, "__");
  s = s.replace(/ /g, "_");

  return s;
}

export function staticBadge(badge: StaticBadge): string {
  let { label = "", message = "", color = "blue", ...styles } = badge;
  label = escapeParam(label);
  message = escapeParam(message);
  color = escapeParam(color);

  const mainPart = `${label}-${message}-${color}`;

  const query = makeQuery(styles);

  let url = `https://img.shields.io/badge/${mainPart}`;

  if (query !== "") {
    url += `?${query}`;
  }

  return url;
}
