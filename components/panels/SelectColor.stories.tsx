import { Meta, Story } from "@storybook/react/types-6-0";
import { SelectColor, SelectColorProps } from "./SelectColor";

export default {
    title: "Panels/Select Color",
    component: SelectColor
} as Meta;

const Template: Story<SelectColorProps> = (args) => <SelectColor {...args} />;

export const Basic = Template.bind({});
Basic.args = {} as SelectColorProps;
