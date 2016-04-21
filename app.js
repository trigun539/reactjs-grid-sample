var express        = require('express');
var app            = express();
var databases      = require('./data/sample-dbs.json');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');

/*
 * APP Configuration
 */

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(express.static('build'));

/*
 * Routes
 */

app.get('/', function (req, res) {
	  res.render('index', {databases: databases});
});

/*
 * API
 */

app.get('/api/databases', function (req, res, next) {
	res.send(databases);
});

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});
