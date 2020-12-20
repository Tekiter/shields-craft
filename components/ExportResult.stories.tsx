import { Meta, Story } from "@storybook/react/types-6-0";
import { ExportBadge, ExportBadgeProps } from "./ExportResult";

export default {
  title: "Common/Export Badge",
  component: ExportBadge,
} as Meta;

const Template: Story<ExportBadgeProps> = (args) => {
  return <ExportBadge {...args} />;
};

export const Basic = Template.bind({});
Basic.args = {
  url: "https://img.shields.io/badge/shields.io-badge-blue?style=flat",
  alt: "shield.io badge",
} as ExportBadgeProps;
