/**
 * Import node modules to use as a middleware
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


/**
 * Database configuration file import
 */
const config = require('./config/database');

/**
 * Connect to mongo via mongoose 
 */
mongoose.connect(config.database, {
    // useMongoClient: true
}, (err) => {
    if (err) console.log(err);
});

/**
 * Test mongoose connection
 */
mongoose.connection.openUri(config.database)
    .once('open', () => console.log(`connected to database ${config.database}`))
    .on('error', (error) => console.log(`Database Error`, error));
/**
 * Initialize express and import routes for express
 */
const app = express();
const userView = require('./routes/userView');

/**
 * Backend application port
 */
const port = 3000;

/**
 * Accept requests to express from any domain:port,
 *  as angular application will be running on different port
 */
app.use(cors());

/**
 * Folder in which frontend files will be located
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Convert request forms data in json
 */
app.use(bodyParser.json());

/**
 * Passport middleware to protect routes
 */
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport);

/**
 * Express Router for Users URL
 */
app.use('/userView', userView);

/**
 * Express Router for base URL
 */
app.get('/', (req, res) => {
    res.send('invalid Endpoint');
});

/**
 * Start application
 */
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});