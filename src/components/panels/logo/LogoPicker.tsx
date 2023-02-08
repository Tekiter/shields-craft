import { Menu } from "semantic-ui-react";
import { FC } from "react";

export interface LogoPickerProps {
    currentMode: number;
    modes?: LogoMode[];
    onModeChange?: (modeIdx: number) => void;
}

export interface LogoMode {
    key: string;
    name: string;
    render: Function;
    point?: boolean;
}

export const LogoPicker: FC<LogoPickerProps> = (props) => {
    const { currentMode = 0, modes = [], onModeChange } = props;

    function handleModeChange(modeIdx: number) {
        if (onModeChange && typeof onModeChange === "function") {
            onModeChange(modeIdx);
        }
    }

    return (
        <div>
            <Menu widths={3} pointing={modes[currentMode].point}>
                {modes.map((m, idx) => (
                    <Menu.Item
                        key={m.key}
                        active={currentMode === idx}
                        onClick={() => handleModeChange(idx)}>
                        {m.name}
                    </Menu.Item>
                ))}
            </Menu>
            {modes[currentMode].render()}
        </div>
    );
};
