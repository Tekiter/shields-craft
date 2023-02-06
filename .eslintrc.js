module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended", "plugin:storybook/recommended"],
  plugins: ["simple-import-sort"],
  rules: {
    "prettier/prettier": ["error", {
      endOfLine: "auto"
    }, {
      usePrettierrc: true
    }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "jsx-a11y/anchor-is-valid": ["error", {
      components: ["Link"],
      specialLink: ["hrefLeft", "hrefRight"],
      aspects: ["invalidHref", "preferButton"]
    }],
    "no-unused-vars": "off",
    "prefer-const": "off",
    "react/display-name": "off"
  }
};