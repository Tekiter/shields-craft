import { Meta, Story } from "@storybook/react/types-6-0";
import { BadgeColorPicker, BadgeColorPickerProps } from "./BadgeColorPicker";

export default {
    title: "Common/Color Picker",
    component: BadgeColorPicker,
    argTypes: {}
} as Meta;

const Template: Story<BadgeColorPickerProps> = (args) => {
    return <BadgeColorPicker {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
    children: "Select Color"
} as BadgeColorPickerProps;
