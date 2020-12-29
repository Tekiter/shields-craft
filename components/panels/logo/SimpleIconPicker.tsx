import Color from "color";
import { WrapBox } from "@/components/misc/WrapBox";
import { SVGIcon } from "@/components/misc/SVGIcon";
import { FC, ReactNode, useEffect, useState } from "react";
import { Button, Header, Input, Segment, Visibility, VisibilityEventData } from "semantic-ui-react";
import simpleIcons from "simple-icons";
interface SimpleIcon {
    title: string;
    hex: string;
    source: string;
}

interface SimpleIcon {
    skey?: string;
}

function makeSearchKey(str: string) {
    return str.replace(/-/g, "").toLowerCase();
}

async function getIconList() {
    let icons: Array<SimpleIcon>;
    try {
        icons = (await import("simple-icons/_data/simple-icons.json")).default.icons;
    } catch {
        const r = await fetch(
            "https://rawcdn.githack.com/simple-icons/simple-icons/7dce90587ba42f60b54ea64f3bedd237d1f6cbe7/_data/simple-icons.json"
        );
        icons = (await r.json()).icons;
    }
    icons.sort((a, b) => {
        return (
            Color("#" + b.hex)
                .hsl()
                .hue() -
            Color("#" + a.hex)
                .hsl()
                .hue()
        );
    });
    return icons;
}

interface IconButtonProps {
    name: string;
    selected?: boolean;
    color?: string;
    onClick?: (name: string) => void;
}

const IconButton: FC<IconButtonProps> = (props) => {
    const { name, selected = false, color = undefined, onClick } = props;

    function handleClick() {
        onClick(name);
    }

    const resBackColor = color === undefined ? "" : "#" + color;
    const resColor = Color(resBackColor).isDark() ? "white" : "black";

    return (
        <Button
            onClick={handleClick}
            style={{
                width: "10em",
                marginBottom: "0.4rem",
                marginRight: "0.3rem",
                backgroundColor: resBackColor,
                color: resColor
            }}
            disabled={selected}>
            <div>
                <SVGIcon svg={simpleIcons.get(name).svg} color={resColor} />
            </div>
            <div style={{ marginTop: "0.8em" }}>{name}</div>
        </Button>
    );
};

interface InfiniteScrollProps {
    data: ReactNode[];
}

const InfiniteScroll: FC<InfiniteScrollProps> = (props) => {
    const { data } = props;

    const [loadedData, setLoadedData] = useState([]);
    const [fetchedCount, setFetchedCount] = useState(0);

    function fetchMore() {
        const newData = [];

        const newIdx = Math.min(fetchedCount + 60, data.length);
        setFetchedCount(newIdx);

        for (let i = 0; i < newIdx; i++) {
            newData.push(data[i]);
        }

        setLoadedData(newData);
    }

    useEffect(() => {
        setLoadedData([]);
        setFetchedCount(0);
        fetchMore();
    }, [data]);

    function handleScroll(_: null, { calculations }: VisibilityEventData) {
        if (calculations.bottomVisible) {
            fetchMore();
        }
    }

    return (
        <Visibility onUpdate={handleScroll}>
            <WrapBox>{loadedData}</WrapBox>
        </Visibility>
    );
};

export interface SimpleIconsPickerProps {
    onChange?: (value: string) => void;
}

export const SimpleIconsPicker: FC<SimpleIconsPickerProps> = (props: SimpleIconsPickerProps) => {
    const [iconList, setIconList] = useState([]);
    const [selected, setSelected] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        (async function () {
            const icons = await getIconList();
            icons.forEach((icon) => {
                icon.skey = makeSearchKey(icon.title);
            });
            setIconList(() => icons);
        })();
    }, []);

    const handleChange = (value: string) => () => {
        setSelected(value);
        if (typeof props.onChange === "function") {
            props.onChange(value);
        }
    };

    function handleSearch(e) {
        setSearch(e.target.value);
    }

    return (
        <>
            <Header as="h4">
                Use icons from{" "}
                <a href="https://simpleicons.org/" target="_blank" rel="noreferrer">
                    Simple Icons
                </a>
            </Header>
            <Input
                icon="search"
                placeholder="Search..."
                fluid
                onChange={handleSearch}
                value={search}
            />
            <Segment basic style={{ height: "21rem", overflow: "auto" }}>
                <InfiniteScroll
                    data={iconList
                        .filter((icon) => icon.skey.includes(makeSearchKey(search)))
                        .map((icon) => (
                            <IconButton
                                key={icon.title}
                                name={icon.title}
                                color={icon.hex}
                                selected={icon.title == selected}
                                onClick={handleChange(icon.title)}
                            />
                        ))}></InfiniteScroll>
            </Segment>
        </>
    );
};
