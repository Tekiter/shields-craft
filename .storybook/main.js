const path = require("path");

module.exports = {
    stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "storybook-addon-next-router"
    ],
    framework: "@storybook/react",
    webpackFinal: async (config) => {
        config.resolve.modules = [
            ...(config.resolve.modules || []),
            path.resolve(__dirname, "../")
        ];
        config.resolve.alias = {
            "@": path.resolve(__dirname, "..")
        };

        return config;
    },

    babel: async (options) => ({
        ...options,
        plugins: [...options.plugins, "styled-jsx/babel"]
    }),
    core: {
        builder: "@storybook/builder-webpack5"
    }
};
