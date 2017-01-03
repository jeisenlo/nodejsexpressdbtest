var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');

// dotenv needs to be before requiring the db
require('dotenv').config();

var db = require('./db');
var MONGODB_URI = 'mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@' + process.env.MONGODB_URL;

var app = express();
app.use(bodyParser.json());
app.use(helmet());

var apiRouter = express.Router();
app.use('/api', apiRouter);

var apiV1 = express.Router();
apiRouter.use('/v1', apiV1);

var usersApiV1 = express.Router();
apiV1.use('/users', usersApiV1);

var UsersController = require('./controllers/users');


db.connect(MONGODB_URI, function(err) {
	if (err) {
		console.log('Unable to connect to database.');
		process.exit(1);
	} else {
		// Initialize the app.
		var server = app.listen(process.env.PORT || 3000, function () {
			var port = server.address().port;
			console.log("App now running on port", port);

			var uc = new UsersController(usersApiV1);
		});
	}
})
