module.exports = {
  env: {
    mocha: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  plugins: ["node"],
  extends: ["eslint:recommended", "plugin:node/recommended"],
  rules: {
    "node/no-unsupported-features": 0,
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
  }
};
