import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import { ColorChangeHandler, SketchPicker } from "react-color";
import { Button, Popup, ButtonProps } from "semantic-ui-react";
import Color from "color";
import { badgeColors } from "@/utils/badge";

interface ColoredButtonProps extends Omit<ButtonProps, "color"> {
    color?: string;
}

const ColoredButton: FC<ColoredButtonProps> = (props) => {
    const { color, ...btnProps } = props;
    return (
        <Button
            className="colorbtn"
            {...btnProps}
            style={{ backgroundColor: color, color: Color(color).isDark() ? "white" : "black" }}>
            {props.children}
        </Button>
    );
};

const presentColors = [
    ...badgeColors.map(({ key, color }) => ({
        title: key,
        color
    })),
    { title: "default", color: "#555555" }
];

export interface BadgeColorPickerProps {
    onChange?(color: string): void;
    color?: string;
    fluid?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
}

export const BadgeColorPicker: FC<BadgeColorPickerProps> = (props: BadgeColorPickerProps) => {
    const [color, setColor] = useState(Color("#000000").hex());

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
            const col = Color("#" + props.color);
            setColor(() => col.hex());
        } catch (_) {
            setColor(() => Color("#000000").hex());
        }
    }, [props.color]);

    return (
        <div className="root" style={props.style}>
            <Popup
                trigger={
                    <ColoredButton color={color} fluid={props.fluid}>
                        {props.children}
                    </ColoredButton>
                }
                on="click"
                position="bottom left">
                <SketchPicker
                    color={color}
                    onChange={handleChange}
                    onChangeComplete={populateChange}
                    disableAlpha
                    presetColors={presentColors}
                />
            </Popup>

            <style jsx global>{`
                .root {
                    min-width: 200px;
                }
            `}</style>
        </div>
    );
};
