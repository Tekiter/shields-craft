import { Meta, Story } from "@storybook/react/types-6-0";
import { StaticBadgeCraft, StaticBadgeCraftProps } from "./StaticBadgeCraft";

export default {
    title: "Static Badge/Craft",
    component: StaticBadgeCraft
} as Meta;

const Template: Story<StaticBadgeCraftProps> = (args) => <StaticBadgeCraft {...args} />;

export const Grid = Template.bind({});
Grid.args = {} as StaticBadgeCraftProps;
