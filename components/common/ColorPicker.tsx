import { FC, useState } from "react";
import { ColorChangeHandler, SketchPicker, SliderPicker } from "react-color";
import { Button, Popup, Tab } from "semantic-ui-react";
import Color from "color";

export interface BadgeColorPickerProps {
    onChange?(color: string): void;
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

    const panes = [
        {
            menuItem: "Simple",
            render: () => (
                <>
                    <SliderPicker
                        className="sliderpicker"
                        color={color}
                        onChange={handleChange}
                        onChangeComplete={populateChange}
                    />
                    <style jsx>
                        {`
                            .sliderpicker {
                                min-width: 300px;
                                margin: 20px 0;
                            }
                        `}
                    </style>
                </>
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
        <div className="root">
            <Popup
                trigger={
                    <Button className="btn">
                        <span style={{ color: Color(color).isDark() ? "white" : "black" }}>
                            Choose Color
                        </span>
                    </Button>
                }
                on="click"
                hideOnScroll>
                <Tab panes={panes} />
            </Popup>

            <style jsx>{`
                .btn {
                    background-color: ${color} !important;
                }

                .root {
                    min-width: 200px;
                }
            `}</style>
        </div>
    );
};
