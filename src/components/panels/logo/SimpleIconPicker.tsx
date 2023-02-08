import Color from "color";
import { WrapBox } from "@/src/components/misc/WrapBox";
import { SVGIcon } from "@/src/components/misc/SVGIcon";
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
import type { SimpleIcon } from "simple-icons";

interface SimpleIconMeta {
    key: string;
    skey: string;
    icon: SimpleIcon;
}

function makeSearchKey(str: string) {
    return str.replace(/-/g, "").toLowerCase();
}

interface IconButtonProps {
    name: string;
    svg: string;
    selected?: boolean;
    color?: string;
    onClick?: (name: string) => void;
}

const IconButton: FC<IconButtonProps> = (props) => {
    const { svg, name, selected = false, color = undefined, onClick } = props;

    function handleClick() {
        onClick(name);
    }

    const resBackColor = color === undefined ? "" : "#" + color;
    const resColor = Color(resBackColor).isDark() ? "white" : "black";

    const icon = <SVGIcon svg={svg} color={resColor} style={{ margin: "0 auto" }} />;

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
                visible={svg !== ""}
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
            const icnMap = (await import("simple-icons")).default;
            let icons = Object.entries(icnMap);
            icons.sort((a, b) => {
                return (
                    Color("#" + b[1].hex)
                        .hsl()
                        .hue() -
                    Color("#" + a[1].hex)
                        .hsl()
                        .hue()
                );
            });
            setIconList(
                icons.map(([key, icon]) => ({ key, icon, skey: makeSearchKey(icon.title) }))
            );
        })();
    }, []);

    const filteredIconList = useMemo(() => {
        return iconList.filter((icon) => icon.skey.includes(makeSearchKey(search)));
    }, [iconList, search]);

    const handleChange = (value: string) => () => {
        setSelected(value);
        props.onChange?.(value);
    };

    function handleSearch(e: { target: { value: string } }) {
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
                    render={({ key, icon }) => (
                        <IconButton
                            key={key}
                            name={icon.title}
                            svg={icon.svg}
                            color={icon.hex}
                            selected={icon.title == selected}
                            onClick={handleChange(icon.title)}
                        />
                    )}></InfiniteScroll>
            </Segment>
        </>
    );
};
