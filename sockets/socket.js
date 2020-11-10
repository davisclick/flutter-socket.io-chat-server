const { io } = require('../index');
const { validJWT } = require('../helpers/jwt');
const {  userLogged,userDisconnected } = require('../controllers/sockets');



//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Client connected' );
    const [valid, uid] = validJWT(  client.handshake.headers['x-token'] );

    if( !valid ){
        return client.disconnect();
    }

    userLogged( uid );
    
    client.on('disconnect', () => { 
        userDisconnected( uid ); 
    });

    client.on('flutter-message', ( payload ) => { 
        console.log( payload );
    });

});