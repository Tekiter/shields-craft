import { Meta, Story } from "@storybook/react/types-6-0";
import { SelectLogo, SelectLogoProps } from "./SelectLogo";

export default {
    title: "Panels/Select Logo",
    component: SelectLogo
} as Meta;

const Template: Story<SelectLogoProps> = (args) => <SelectLogo {...args} />;

export const Basic = Template.bind({});
Basic.args = {} as SelectLogoProps;
