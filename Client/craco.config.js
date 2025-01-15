module.exports = {
  babel: {
    plugins: [
      [
        "babel-plugin-react-compiler",
        {
          target: "18", // '17' | '18' | '19'
        },
      ],
    ],
  },
};
