import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { ColorChangeHandler, SketchPicker, SliderPicker } from "react-color";
import { Button, Popup, Tab, ButtonProps } from "semantic-ui-react";
import Color from "color";

interface ColoredButtonProps extends Omit<ButtonProps, "color"> {
    color?: string;
}

const ColoredButton: FC<ColoredButtonProps> = (props) => {
    const { color, ...btnProps } = props;
    return (
        <span className="root">
            <Button className="colorbtn" {...btnProps}>
                <span
                    className="clbtn"
                    style={{ color: Color(color).isDark() ? "white" : "black" }}>
                    {props.children}
                </span>
            </Button>
            <style jsx>{`
                .root :global(.colorbtn) {
                    background-color: ${color} !important;
                }
            `}</style>
        </span>
    );
};

export interface BadgeColorPickerProps {
    onChange?(color: string): void;
    color?: string;
    fluid?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
}

export const BadgeColorPicker: FC<BadgeColorPickerProps> = (props: BadgeColorPickerProps) => {
    const [color, setColor] = useState("#405fbf");

    const handleChange: ColorChangeHandler = (color) => {
        setColor(color.hex);
    };

    const populateChange: ColorChangeHandler = (color, evt) => {
        handleChange(color, evt);
        if (props.onChange && typeof props.onChange === "function") {
            props.onChange(color.hex);
        }
    };

    useEffect(() => {
        try {
            const col = Color(props.color);
            setColor(() => col.hex());
        } catch (_) {
            //
        }
    }, [props.color]);

    const panes = [
        {
            menuItem: "Simple",
            render: () => (
                <div>
                    <SliderPicker
                        className="sliderpicker"
                        color={color}
                        onChange={handleChange}
                        onChangeComplete={populateChange}></SliderPicker>
                    <style jsx global>
                        {`
                            .sliderpicker {
                                min-width: 300px;
                                margin: 20px 0;
                            }
                        `}
                    </style>
                </div>
            )
        },
        {
            menuItem: "Advanced",
            render: () => (
                <SketchPicker
                    color={color}
                    onChange={handleChange}
                    onChangeComplete={populateChange}
                    disableAlpha
                />
            )
        }
    ];

    return (
        <div className="root" style={props.style}>
            <Popup
                trigger={
                    <ColoredButton color={color} fluid={props.fluid}>
                        {props.children}
                    </ColoredButton>
                }
                on="click"
                position="bottom left"
                hideOnScroll>
                <Tab panes={panes} />
            </Popup>

            <style jsx global>{`
                .root {
                    min-width: 200px;
                }
            `}</style>
        </div>
    );
};
