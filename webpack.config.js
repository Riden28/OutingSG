// webpack.config.js

module.exports = {
    entry: './pages/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'pages'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // Add babel-loader to transpile modern JS features
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
  