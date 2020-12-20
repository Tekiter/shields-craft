import { Meta, Story } from "@storybook/react/types-6-0";
import { BadgeResult, BadgeResultProps } from "./BadgeResult";
import { ShieldsStaticBadge } from "./ShieldsStaticBadge";

export default {
  title: "Static Badge/Result",
  component: BadgeResult,
  argTypes: {
    badge: {
      table: {
        disable: true,
      },
    },
    url: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const sampleBadge = (
  <ShieldsStaticBadge label="shield.io" message="badge" color="blue" />
);

const Template: Story<BadgeResultProps> = (args) => {
  return <BadgeResult badge={sampleBadge} {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  url: "https://img.shields.io/badge/shields.io-badge-blue?style=flat",
} as BadgeResultProps;
