const path = require('path');
const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const config = {
	...defaultConfig,
	plugins: [
		/**
		 * Remove previous instance
		 */
		...defaultConfig.plugins.filter(
			(plugin) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
		new DependencyExtractionWebpackPlugin({
			requestToExternal: (request, external) => {
				const externals = {
					underscore: ['_', '.'],
					backbone: ['window', 'Backbone'],
					'jquery-serializejson': ['window', 'serializeJSON'],
					'jquery-ui-sortable': ['window', 'sortable'],
					'wp-color-picker': ['wp', 'wpColorPicker'],
					'wp-color-picker-alpha': ['wp', 'wpColorPickerAlpha'],
					'wp-util': ['wp', 'util'],
					'qlwapp-select2': ['jQuery', 'select2'],
				};

				return externals[request] || external;
			},
		}),
	],
};

module.exports = [
	{
		...config,
		entry: {
			index: path.resolve(__dirname, 'packages', './frontend/style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/frontend/css/'),
		},
		module: {
			...config.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter(),
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css',
			}),
		],
	},
	//Backend
	{
		...config,
		entry: {
			index: path.resolve(__dirname, 'packages', './backend/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/backend/js/'),
			// library: ['qlwpmi', 'backend'],
			// libraryTarget: 'window',
		},
		optimization: {
			minimize: isProduction,
		},
		plugins: [
			/**
			 * Remove previous instance
			 */
			...defaultConfig.plugins.filter(
				(plugin) =>
					plugin.constructor.name !==
					'DependencyExtractionWebpackPlugin'
			),
			new DependencyExtractionWebpackPlugin({
				requestToExternal: (request, external) => {
					if ('@wpmi/components' === request) {
						return ['wpmi', 'components'];
					}
					if ('@wpmi/store' === request) {
						return ['wpmi', 'store'];
					}
					// Return the default value for other requests
					return external;
				},
				requestToHandle: (request, external) => {
					if ('@wpmi/components' === request) {
						return 'wpmi-components';
					}
					if ('@wpmi/store' === request) {
						return 'wpmi-store';
					}
					// Return the default value for other requests
					return external;
				},
			}),
		],
	},
	{
		...config,
		entry: {
			index: path.resolve(__dirname, 'packages', './backend/style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/backend/css/'),
		},
		module: {
			...config.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter(),
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css',
			}),
		],
	},
	//navmenu
	{
		...config,
		entry: {
			index: path.resolve(__dirname, 'packages', './navmenu/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/navmenu/js/'),
			// library: ['qlwpmi', 'navmenu'],
			// libraryTarget: 'window',
		},
		optimization: {
			minimize: isProduction,
		},
		plugins: [
			/**
			 * Remove previous instance
			 */
			...defaultConfig.plugins.filter(
				(plugin) =>
					plugin.constructor.name !==
					'DependencyExtractionWebpackPlugin'
			),
			new DependencyExtractionWebpackPlugin({
				requestToExternal: (request, external) => {
					if ('@wpmi/components' === request) {
						return ['wpmi', 'components'];
					}
					if ('@wpmi/store' === request) {
						return ['wpmi', 'store'];
					}
					// Return the default value for other requests
					return external;
				},
				requestToHandle: (request, external) => {
					if ('@wpmi/components' === request) {
						return 'wpmi-components';
					}
					if ('@wpmi/store' === request) {
						return 'wpmi-store';
					}
					// Return the default value for other requests
					return external;
				},
			}),
		],
	},
	{
		...config,
		entry: {
			index: path.resolve(__dirname, 'packages', './navmenu/style.scss'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/navmenu/css/'),
		},
		module: {
			...config.module,
			rules: [
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter(),
								},
							},
						},
					],
				},
			],
		},
		plugins: [
			new RemoveEmptyScriptsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'style.css',
			}),
		],
	},
	//store
	{
		...defaultConfig,
		entry: {
			index: path.resolve(__dirname, 'packages', './store/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/store/js/'),
			library: ['wpmi', 'store'],
			libraryTarget: 'window',
		},
		optimization: {
			minimize: isProduction,
		},
		// plugins: [
		// 	...defaultConfig.plugins,
		// 	new DependencyExtractionWebpackPlugin(),
		// ],
	},
	//components
	{
		...defaultConfig,
		entry: {
			index: path.resolve(__dirname, 'packages', './components/index.js'),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build/components/js/'),
			library: ['wpmi', 'components'],
			libraryTarget: 'window',
		},
		optimization: {
			minimize: isProduction,
		},
		// plugins: [
		// 	...defaultConfig.plugins,
		// 	new DependencyExtractionWebpackPlugin(),
		// ],
	},
];
