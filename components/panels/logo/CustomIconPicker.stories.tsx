import { Meta, Story } from "@storybook/react/types-6-0";
import { CustomIconPicker, CustomIconPickerProps } from "./CustomIconPicker";

export default {
    title: "Panels/Logo/Custom Icon Picker",
    component: CustomIconPicker
} as Meta;

const Template: Story<CustomIconPickerProps> = (args) => <CustomIconPicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {} as CustomIconPickerProps;
