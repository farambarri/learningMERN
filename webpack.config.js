module.exports = {
  entry: "./src/app/index.jsx",
  output: {
    path: __dirname + "/src/public/js",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.jsx$/,
        exclude: /node_modules/
      }
    ]
  }
};
