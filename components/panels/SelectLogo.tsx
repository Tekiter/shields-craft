import { FC, useEffect, useState } from "react";
import { Dropdown, Header, Segment, Tab } from "semantic-ui-react";

const SimpleIconsPicker = () => {
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

    return (
        <Tab.Pane>
            <Header as="h4">
                Icon name of{" "}
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
            />
        </Tab.Pane>
    );
};

const LogoPicker = (props) => {
    const logoPickerPanes = [
        {
            menuItem: "Simple Icons",
            render: () => <SimpleIconsPicker />
        },
        {
            menuItem: "Custom",
            render: () => <Tab.Pane>Coming Soon</Tab.Pane>
        }
    ];

    return <Tab panes={logoPickerPanes} />;
};

export interface SelectLogoProps {
    onChange: () => void;
}

export const SelectLogo: FC<SelectLogoProps> = (props) => {
    let { onChange } = props;

    return (
        <Segment basic>
            <LogoPicker />
        </Segment>
    );
};
