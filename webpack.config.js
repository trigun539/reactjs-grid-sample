var path    = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		app: ['./src/js/main.js']
	},
	output: {
		filename: './build/js/bundle.js'
	},
	progress: true,
	colors: true,
	inline: true,
	resolve: {
		moduleDirectories: ['./node_modules/', './src/js/'],
		alias: {
			bootstrap: path.join(__dirname, 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js')
		}
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react', 'stage-0']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			output: {
				comments: false
			},
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"production"'
		}),
	]
};
