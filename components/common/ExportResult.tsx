import copy from "copy-to-clipboard";
import { useState } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";

const resultTypes = [
    {
        key: "url",
        name: "URL",
        converter(url: string) {
            return url;
        }
    },
    {
        key: "markdown",
        name: "Markdown",
        converter(url: string, alt: string) {
            return `![${alt}](${url})`;
        }
    },
    {
        key: "html",
        name: "HTML",
        converter(url: string, alt: string) {
            return `<img alt="${alt}" src="${url}">`;
        }
    }
];

export interface ExportBadgeProps {
    url: string;
    alt?: string;
}

export const ExportBadge: React.FC<ExportBadgeProps> = (props: ExportBadgeProps) => {
    const { url = "", alt = "" } = props;

    const [currentType, setCurrentType] = useState(resultTypes[0]);

    const handleCopy = () => {
        if (url !== "") {
            copy(url);
        }
    };

    return (
        <>
            <Segment attached="top">
                <Input
                    action={{
                        color: "teal",
                        labelPosition: "right",
                        icon: "copy",
                        content: "Copy",
                        onClick: handleCopy
                    }}
                    value={currentType.converter(url, alt)}
                    fluid
                />
            </Segment>
            <Menu attached="bottom" tabular>
                {resultTypes.map((item) => (
                    <Menu.Item
                        key={item.key}
                        name={item.name}
                        active={currentType === item}
                        onClick={() => setCurrentType(item)}
                    />
                ))}
            </Menu>
        </>
    );
};
