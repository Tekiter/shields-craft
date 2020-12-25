import { FC, useState } from "react";
import { Segment } from "semantic-ui-react";
import { LogoModes, LogoPicker } from "@/components/panels/logo/LogoPicker";
import { BadgeColorPicker } from "../common/BadgeColorPicker";

export interface SelectLogoProps {
    onChange: (e: { [key: string]: string }) => void;
    logo: string;
    logoColor: string;
    logoWidth: number;
}

export const SelectLogo: FC<SelectLogoProps> = (props) => {
    let { onChange } = props;

    const [logoMode, setLogoMode] = useState<LogoModes>("simpleIcons");

    function handleLogoModeChange(mode: LogoModes) {
        setLogoMode(mode);

        if (typeof onChange !== "function") {
            return;
        }

        if (mode === "simpleIcons") {
            //
        } else if (mode === "custom") {
            //
        }
    }

    function handleIconChange(logo: string) {
        if (typeof onChange === "function") {
            onChange({ logo });
        }
    }

    function handleLogoColorChange(color: string) {
        if (typeof onChange === "function") {
            onChange({ logoColor: color });
        }
    }

    return (
        <Segment basic>
            <LogoPicker
                mode={logoMode}
                onModeChange={handleLogoModeChange}
                onIconChange={handleIconChange}
            />
            <BadgeColorPicker fluid onChange={handleLogoColorChange}>
                Icon Color
            </BadgeColorPicker>
        </Segment>
    );
};
