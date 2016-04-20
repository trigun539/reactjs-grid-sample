var path = require('path');

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
	devtool: '#eval-source-map',
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
  }
};
