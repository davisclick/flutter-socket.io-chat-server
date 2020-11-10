const { io } = require('../index');
const { validJWT } = require('../helpers/jwt');



//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Client connected' );
    const [valid, uid] = validJWT(  client.handshake.headers['x-token'] );

    if( !valid ){
        return client.disconnect();
    }

    client.on('disconnect', () => { 
        console.log( 'Client disconnected' );
    });

    client.on('flutter-message', ( payload ) => { 
        console.log( payload );
    });

});