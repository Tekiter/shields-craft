import { FC, useState } from "react";
import { Segment } from "semantic-ui-react";
import { LogoMode, LogoPicker } from "@/components/panels/logo/LogoPicker";
import { BadgeColorPicker } from "../common/BadgeColorPicker";
import { SimpleIconsPicker } from "./logo/SimpleIconPicker";
import { CustomIconPicker } from "./logo/CustomIconPicker";

export interface SelectLogoProps {
    onChange: (e: { [key: string]: string }) => void;
    logo: string;
    logoColor: string;
    logoWidth: number;
}

export const SelectLogo: FC<SelectLogoProps> = (props) => {
    let { onChange } = props;

    const [logoMode, setLogoMode] = useState<number>(0);

    const modes: LogoMode[] = [
        {
            key: "none",
            name: "None",
            render: () => <></>,
            point: false
        },
        {
            key: "simpleIcons",
            name: "Simple Icons",
            render: () => (
                <>
                    <SimpleIconsPicker onChange={handleIconChange} />
                    <BadgeColorPicker
                        fluid
                        onChange={handleLogoColorChange}
                        style={{ marginTop: "1rem" }}>
                        Select Icon Color
                    </BadgeColorPicker>
                </>
            ),
            point: true
        },
        {
            key: "custom",
            name: "Custom",
            render: () => (
                <>
                    <CustomIconPicker onChange={handleIconChange} />
                    <BadgeColorPicker
                        fluid
                        onChange={handleLogoColorChange}
                        style={{ marginTop: "1rem" }}>
                        Select Icon Color
                    </BadgeColorPicker>
                </>
            ),
            point: true
        }
    ];

    function handleLogoModeChange(idx: number) {
        setLogoMode(idx);
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
            <LogoPicker currentMode={logoMode} modes={modes} onModeChange={handleLogoModeChange} />
        </Segment>
    );
};
