module.exports = {
  stories: ["../dist/**/*.stories.js"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-designs",
    "storybook-addon-next-router",
  ],
  core: {
    builder: "webpack5",
  },
  staticDirs: [{ from: "../public", to: "/public" }],
  framework: "@storybook/react",
};
