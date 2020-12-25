import { SyntheticEvent, useEffect, useState } from "react";
import { Dropdown, DropdownProps, Header } from "semantic-ui-react";

export interface SimpleIconsPickerProps {
    onChange?: (value: string) => void;
}

export const SimpleIconsPicker = (props: SimpleIconsPickerProps) => {
    const [iconList, setIconList] = useState([]);

    useEffect(() => {
        (async function () {
            const r = await fetch(
                "https://rawcdn.githack.com/simple-icons/simple-icons/7dce90587ba42f60b54ea64f3bedd237d1f6cbe7/_data/simple-icons.json"
            );
            const json = await r.json();
            setIconList(() => json.icons);
        })();
    }, []);

    function handleChange(_: SyntheticEvent, { value }: DropdownProps) {
        if (typeof props.onChange === "function") {
            props.onChange(value as string);
        }
    }

    return (
        <>
            <Header as="h4">
                Use icons from{" "}
                <a href="https://simpleicons.org/" target="_blank" rel="noreferrer">
                    Simple Icons
                </a>
            </Header>
            <Dropdown
                placeholder="icon name"
                clearable
                search
                fluid
                selection
                options={iconList.map((icon) => ({
                    key: icon.title,
                    text: icon.title,
                    value: icon.title
                }))}
                onChange={handleChange}
            />
        </>
    );
};
