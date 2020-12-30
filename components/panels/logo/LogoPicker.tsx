import { Menu } from "semantic-ui-react";
import { Visible } from "@/components/misc/Visible";
import { SimpleIconsPicker } from "@/components/panels/logo/SimpleIconPicker";
import { FC } from "react";
import { CustomIconPicker } from "./CustomIconPicker";

export type LogoModes = "simpleIcons" | "custom";

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
        if (mode === "simpleIcons") {
            return <SimpleIconsPicker onChange={handleSimpleIconsChange} />;
        } else if (mode === "custom") {
            return <CustomIconPicker onChange={handleCustomIconChange} />;
        }
    })();

    return (
        <div>
            <Menu pointing widths={2}>
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
            {/* <Visible visible={mode === "simpleIcons"}>
                <SimpleIconsPicker onChange={handleSimpleIconsChange} />
            </Visible>

            <Visible visible={mode === "custom"}>
                <CustomIconPicker onChange={handleCustomIconChange} />
            </Visible> */}
            {currentPicker}
        </div>
    );
};
