export const badgeStyleList = [
    "flat",
    "flat-square",
    "for-the-badge",
    "plastic",
    "social"
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

function makeQuery(obj: BadgeStyle): string {
    const arr = [];

    for (const key in obj) {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            continue;
        }
        arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key] + "")}`);
    }

    return arr.join("&");
}

function escapeParam(value: string): string {
    let s = encodeURIComponent(value);
    s = s.replace(/-/g, "--");
    s = s.replace(/_/g, "__");
    s = s.replace(/%20/g, "_");

    return s;
}

export function staticBadge(badge: StaticBadge): string {
    let { label = "", message = "", color = "blue", ...styles } = badge;
    label = escapeParam(label);
    message = escapeParam(message);
    color = escapeParam(beautifyColor(color));

    const mainPart = `${label}-${message}-${color}`;

    styles.logoColor = beautifyColor(styles.logoColor);

    styles.labelColor = beautifyColor(styles.labelColor);
    if (styles.labelColor === "555555") {
        styles.labelColor = null;
    }

    const query = makeQuery(styles);

    let url = `https://img.shields.io/badge/${mainPart}`;

    if (query !== "") {
        url += `?${query}`;
    }

    return url;
}

export const badgeColors: ReadonlyArray<{ key: string; color: string }> = [
    { key: "brightgreen", color: "#44cc11" },
    { key: "green", color: "#97ca00" },
    { key: "yellowgreen", color: "#a4a61d" },
    { key: "yellow", color: "#dfb317" },
    { key: "orange", color: "#fe7d37" },
    { key: "red", color: "#e05d44" },
    { key: "lightgrey", color: "#9f9f9f" },
    { key: "success", color: "#44cc11" },
    { key: "important", color: "#fe7d37" },
    { key: "critical", color: "#e05d44" },
    { key: "blue", color: "#007ec6" },
    { key: "inactive", color: "#9f9f9f" },
    { key: "blueviolet", color: "#8a2be2" },
    // { key: "default", color: "#555555" },
    { key: "black", color: "#000000" },
    { key: "white", color: "#ffffff" }
] as const;

const badgeColorsRev = (() => {
    const r: { [color: string]: string } = {};
    badgeColors.forEach((item) => {
        r[item.color.toLowerCase()] = item.key;
        if (item.color[0] === "#") {
            r[item.color.toLowerCase().slice(1)] = item.key;
        }
    });
    return r;
})();

export function beautifyColor(color: string): string {
    if (color === undefined) {
        return color;
    }
    color = color.toLowerCase();
    if (badgeColorsRev[color] !== undefined) {
        return badgeColorsRev[color];
    }
    return color;
}
