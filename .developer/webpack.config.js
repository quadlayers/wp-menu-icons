const path = require("path");
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
const isProduction = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require("node-sass-glob-importer");

const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

module.exports = [
	{
		...defaultConfig,
		entry: {
			'index': path.resolve(__dirname, 'src', './frontend/style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../build/frontend/css/'),
		},
		module: {
			...defaultConfig.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter()
								}
							}
						}
					]
				}
			]
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
		]
	},
	// frontend/index.js
	{
		...defaultConfig,
		entry: {
			'index': path.resolve(__dirname, 'src', './frontend/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../build/frontend/js/'),
		},
		optimization: {
			minimize: isProduction,
		},
		// plugins: [
		// 	...defaultConfig.plugins,
		// 	new DependencyExtractionWebpackPlugin(),
		// ],
	},
	{
		...defaultConfig,
		entry: {
			'index': path.resolve(__dirname, 'src', './backend/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../build/backend/js/'),
		},
		optimization: {
			minimize: isProduction,
		},
		// plugins: [
		// 	...defaultConfig.plugins,
		// 	new DependencyExtractionWebpackPlugin(),
		// ],
	},
	{
		...defaultConfig,
		entry: {
			'index': path.resolve(__dirname, 'src', './backend/style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, '../build/backend/css/'),
		},
		module: {
			...defaultConfig.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter()
								}
							}
						}
					]
				}
			]
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css'
			}),
		]
	},
];