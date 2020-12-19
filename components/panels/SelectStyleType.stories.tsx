import { Meta, Story } from "@storybook/react/types-6-0";
import { SelectStyleType, SelectStyleTypeProps } from "./SelectStyleType";

export default {
  title: "Select Style Type",
  component: SelectStyleType,
} as Meta;

const Template: Story<SelectStyleTypeProps> = (args) => (
  <SelectStyleType {...args} />
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  vertical: false,
} as SelectStyleTypeProps;

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
} as SelectStyleTypeProps;
