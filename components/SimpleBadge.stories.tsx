import { Meta, Story } from "@storybook/react/types-6-0";
import { SimpleBadge, SimpleBadgeProps } from "./SimpleBadge";

export default {
  title: "Simple Badge",
  component: SimpleBadge,
} as Meta;

const Template: Story<SimpleBadgeProps> = (args) => <SimpleBadge {...args} />;

export const Flat = Template.bind({});
Flat.args = {
  style: "flat",
};
