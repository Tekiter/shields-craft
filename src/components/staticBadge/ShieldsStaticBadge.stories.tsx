import { Meta, Story } from "@storybook/react/types-6-0";
import { StaticBadge } from "@/src/utils/badge";
import { ShieldsStaticBadge, ShieldsBadgeProps } from "./ShieldsStaticBadge";

export default {
    title: "Static Badge/Shields.io Static Badge",
    component: ShieldsStaticBadge,
    argTypes: {
        color: { control: "color" },
        logoColor: { control: "color" },
        labelColor: { control: "color" }
    },
    args: {
        style: "flat",
        label: "shields.io",
        message: "badge",
        color: "blue"
    }
} as Meta;

const Template: Story<ShieldsBadgeProps> = (args) => <ShieldsStaticBadge {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const WithLogo = Template.bind({});
WithLogo.args = {
    logo: "github",
    label: "github",
    color: "green",
    style: "for-the-badge"
} as StaticBadge;

export const OnlyMessage = Template.bind({});
OnlyMessage.args = {
    label: "",
    message: "Youtube",
    logo: "youtube",
    color: "red",
    style: "flat-square"
} as StaticBadge;
