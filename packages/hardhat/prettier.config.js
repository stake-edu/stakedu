module.exports = {
  plugins: [
    "prettier-plugin-solidity",
    "@trivago/prettier-plugin-sort-imports",
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: "*.sol",
      options: {
        printWidth: 120,
      },
    },
  ],
};
