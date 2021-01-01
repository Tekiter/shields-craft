import { Menu } from "semantic-ui-react";
import { SimpleIconsPicker } from "@/components/panels/logo/SimpleIconPicker";
import { FC } from "react";
import { CustomIconPicker } from "./CustomIconPicker";

export type LogoModes = "none" | "simpleIcons" | "custom";

export interface LogoPickerProps {
    mode?: LogoModes;
    onModeChange?: (mode: LogoModes) => void;
    onIconChange?: (icon: string) => void;
}

export const LogoPicker: FC<LogoPickerProps> = (props) => {
    const { mode = "simpleIcons", onModeChange, onIconChange } = props;

    function handleModeChange(modeType: LogoModes) {
        if (onModeChange && typeof onModeChange === "function") {
            onModeChange(modeType);
        }
    }

    function handleSimpleIconsChange(iconName: string) {
        if (typeof onIconChange === "function") {
            onIconChange(iconName);
        }
    }

    function handleCustomIconChange(icondata: string) {
        if (typeof onIconChange === "function") {
            onIconChange(icondata);
        }
    }

    const currentPicker = (() => {
        if (mode === "none") {
            return <></>;
        } else if (mode === "simpleIcons") {
            return <SimpleIconsPicker onChange={handleSimpleIconsChange} />;
        } else if (mode === "custom") {
            return <CustomIconPicker onChange={handleCustomIconChange} />;
        }
    })();

    return (
        <div>
            <Menu widths={3}>
                <Menu.Item
                    name="None"
                    active={mode === "none"}
                    onClick={() => handleModeChange("none")}
                />
                <Menu.Item
                    name="Simple Icons"
                    active={mode === "simpleIcons"}
                    onClick={() => handleModeChange("simpleIcons")}
                />
                <Menu.Item
                    name="Custom"
                    active={mode === "custom"}
                    onClick={() => handleModeChange("custom")}
                />
            </Menu>
            {currentPicker}
        </div>
    );
};
