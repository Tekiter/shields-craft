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

        if (mode === "none") {
            if (typeof onChange === "function") {
                onChange({ logo: "", logoColor: "" });
            }
        } else if (mode === "simpleIcons") {
            if (typeof onChange === "function") {
                onChange({ logo: "" });
            }
        } else if (mode === "custom") {
            if (typeof onChange === "function") {
                onChange({ logo: "" });
            }
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
            {logoMode !== "none" ? (
                <BadgeColorPicker
                    fluid
                    onChange={handleLogoColorChange}
                    style={{ marginTop: "1rem" }}>
                    Select Icon Color
                </BadgeColorPicker>
            ) : null}
        </Segment>
    );
};
