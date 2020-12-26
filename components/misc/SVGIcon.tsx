import clsx from "clsx";
import { CSSProperties, FC, useEffect, useRef } from "react";

export interface SVGIconProps {
    svg: string;
    height?: string;
    width?: string;
    color?: string;
    hover?: string;
    className?: string;
    style?: CSSProperties;
}

export const SVGIcon: FC<SVGIconProps> = (props: SVGIconProps) => {
    const {
        svg,
        height = "32px",
        width = "32px",
        color = "#adadad",
        hover,
        className,
        style
    } = props;

    const wrapper = useRef(null);

    useEffect(() => {
        wrapper.current.innerHTML = svg;
    }, []);

    const hoverCSS = hover ? `fill: ${hover}; transform: scale(1.1);` : "";

    return (
        <span className={clsx("svg-icon-root", className)} ref={wrapper} style={style}>
            <style jsx>{`
                .svg-icon-root {
                    height: ${height};
                    width: ${width};
                }

                .svg-icon-root :global(svg) {
                    height: ${height};
                    width: ${width};
                    fill: ${color};

                    transition: fill 0.2s, transform 0.2s;
                }

                .svg-icon-root :global(svg):hover {
                    ${hoverCSS}
                }
            `}</style>
        </span>
    );
};

export interface SVGIconLinkProps extends SVGIconProps {
    href?: string;
}

export const SVGIconLink: FC<SVGIconLinkProps> = (props) => {
    const { href, ...iconProps } = props;

    return (
        <a href={href} title="shields-craft" target="_blank" rel="noreferrer">
            <SVGIcon className="svgIcon" {...iconProps} />
        </a>
    );
};
