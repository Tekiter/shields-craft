import { Meta, Story } from "@storybook/react/types-6-0";
import { StaticContent, StaticContentProps } from "./StaticContent";

export default {
    title: "Panels/Static Badge Content",
    component: StaticContent
} as Meta;

const Template: Story<StaticContentProps> = (args) => <StaticContent {...args} />;

export const Horizontal = Template.bind({});
Horizontal.args = {} as StaticContentProps;
