const path = require("path");

module.exports = {
    stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
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
    })
};
