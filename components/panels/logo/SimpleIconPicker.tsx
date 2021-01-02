import Color from "color";
import { WrapBox } from "@/components/misc/WrapBox";
import { SVGIcon } from "@/components/misc/SVGIcon";
import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
    Button,
    Header,
    Input,
    Segment,
    Transition,
    Visibility,
    VisibilityEventData
} from "semantic-ui-react";

interface SimpleIconMeta {
    title: string;
    hex: string;
    source: string;
}

interface SimpleIconMeta {
    skey?: string;
}

interface SimpleIcon {
    svg: string;
}

async function simpleIcons(name: string): Promise<SimpleIcon> {
    return (await import("simple-icons")).default[name];
}

function makeSearchKey(str: string) {
    return str.replace(/-/g, "").toLowerCase();
}

async function getIconList() {
    let icons: Array<SimpleIconMeta>;
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

    const [iconSVG, setIconSVG] = useState("");

    function handleClick() {
        onClick(name);
    }

    useEffect(() => {
        (async () => {
            const icon = (await simpleIcons(name)).svg;

            setIconSVG(icon);
        })();
    }, []);

    const resBackColor = color === undefined ? "" : "#" + color;
    const resColor = Color(resBackColor).isDark() ? "white" : "black";

    const icon = <SVGIcon svg={iconSVG} color={resColor} style={{ margin: "0 auto" }} />;

    return (
        <Button
            onClick={handleClick}
            style={{
                width: "10rem",
                minHeight: "6.5rem",
                marginBottom: "0.4rem",
                marginRight: "0.3rem",
                backgroundColor: resBackColor,
                color: resColor
            }}
            disabled={selected}>
            <Transition
                visible={iconSVG !== ""}
                animation="fade"
                duration={300}
                style={{ display: "inline-block" }}>
                <div>
                    {icon}
                    <div style={{ marginTop: "0.8em" }}>{name}</div>
                </div>
            </Transition>
        </Button>
    );
};

interface InfiniteScrollProps {
    data: SimpleIconMeta[];
    render: (icon: SimpleIconMeta) => ReactNode;
}

const InfiniteScroll: FC<InfiniteScrollProps> = (props) => {
    const { data, render } = props;

    const [loadedData, setLoadedData] = useState([]);
    const [fetchedCount, setFetchedCount] = useState(0);

    const fetchMore = useCallback(() => {
        const newData = [];

        const newIdx = Math.min(fetchedCount + 60, data.length);
        setFetchedCount(newIdx);

        for (let i = 0; i < newIdx; i++) {
            newData.push(data[i]);
        }

        setLoadedData(newData);
    }, [fetchedCount, data]);

    useEffect(() => {
        setLoadedData([]);
        setFetchedCount(0);
        fetchMore();
    }, [data]);

    const handleScroll = (_: null, { calculations }: VisibilityEventData) => {
        if (calculations.bottomVisible) {
            fetchMore();
        }
    };

    return (
        <Visibility onUpdate={handleScroll}>
            <WrapBox>{loadedData.map((data) => render(data))}</WrapBox>
        </Visibility>
    );
};

export interface SimpleIconsPickerProps {
    onChange?: (value: string) => void;
}

export const SimpleIconsPicker: FC<SimpleIconsPickerProps> = (props: SimpleIconsPickerProps) => {
    const [iconList, setIconList] = useState<SimpleIconMeta[]>([]);
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

    const filteredIconList = useMemo(() => {
        return iconList.filter((icon) => icon.skey.includes(makeSearchKey(search)));
    }, [iconList, search]);

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
                    data={filteredIconList}
                    render={(icon) => (
                        <IconButton
                            key={icon.title}
                            name={icon.title}
                            color={icon.hex}
                            selected={icon.title == selected}
                            onClick={handleChange(icon.title)}
                        />
                    )}></InfiniteScroll>
            </Segment>
        </>
    );
};
