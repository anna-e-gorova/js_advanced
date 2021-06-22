module.exports = {
  mode: 'none',
  entry: "./front/script.js",
  output: {
    filename: "./app.js",
  },
  watch: true,
  watchOptions: {
      aggregateTimeout: 500,
      poll: 1000 // порверяем измемения раз в секунду
  },
};
