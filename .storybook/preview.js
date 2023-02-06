import "semantic-ui-css/semantic.min.css";
import { RouterContext } from "next/dist/shared/lib/router-context";

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    nextRouter: {
        Provider: RouterContext.Provider
    }
};
