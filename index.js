const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
 const { dbConnection } = require('./database/config')
 dbConnection();

// App Express
const app = express();

//Body HTTP parser
app.use( express.json() );

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ));

//Routes
app.use( '/api/login', require('./routes/auth') );

server.listen( process.env.PORT, ( err ) => {

    if( err ) throw new Error( err );

    console.log('Server running on port!', 3000);
});