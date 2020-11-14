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

    client.join( uid );

    client.on('personal-message', ( payload ) => {
        console.log(payload);
        io.to( payload.to ).emit( 'personal-message', payload );
    });
    
    client.on('disconnect', () => { 
        userDisconnected( uid ); 
    });

    client.on('flutter-message', ( payload ) => { 
        console.log( payload );
    });

});