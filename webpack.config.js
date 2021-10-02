const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const getFileName = (ext) => {
    return isProd
      ? `[name].[contenthash].bundle.${ext}`
      : `[name].bundle.${ext}`;
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: getFileName('css'),
      }),
      new CleanWebpackPlugin(),
    ];

    if (isDev) {
      plugins.push(new ESLintWebpackPlugin());
    }

    return plugins;
  };

  return {
    // обсалютный путь до папки src, берётся за точку отсчёта
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './index.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: getFileName('js'),
    },
    resolve: {
      // расширения подключаемых файлов
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          // Порядок выполнения справа налево
          // (sass-loader -> css-loader -> Mini...)
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: '8888',
      open: true,
      hot: true,
      watchFiles: './',
    },
  };
};
