import { withNextRouter } from "storybook-addon-next-router";
import { addDecorator } from "@storybook/react";
import "semantic-ui-css/semantic.min.css";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" }
};

addDecorator(withNextRouter({}));
