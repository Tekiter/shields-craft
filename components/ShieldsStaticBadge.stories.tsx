import { Meta, Story } from "@storybook/react/types-6-0";
import { ShieldsStaticBadge, ShieldsBadgeProps } from "./ShieldsStaticBadge";

export default {
  title: "Shields.io Static Badge",
  component: ShieldsStaticBadge,
  argTypes: {
    color: { control: "color" },
  },
} as Meta;

const Template: Story<ShieldsBadgeProps> = (args) => (
  <ShieldsStaticBadge {...args} />
);

export const Flat = Template.bind({});
Flat.args = {
  style: "flat",
  label: "shields.io",
  message: "badge",
  color: "blue",
};
