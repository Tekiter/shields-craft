module.exports = {
    basePath: "/shields-craft",
    async redirects() {
        return [
            {
                source: "/storybook",
                destination: "/storybook/index.html",
                permanent: true
            }
        ];
    }
};
