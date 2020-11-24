const { io } = require('../index');
const { validJWT } = require('../helpers/jwt');
const {  userLogged,userDisconnected, saveMessage } = require('../controllers/sockets');

//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Client connected' );
    const [valid, uid] = validJWT(  client.handshake.headers['x-token'] );

    if( !valid ){
        return client.disconnect();
    }

    userLogged( uid );

    client.join( uid );

    client.on('personal-message', async ( payload ) => {
        await saveMessage(payload);
        io.to( payload.to ).emit( 'personal-message', payload );
    });
    
    client.on('disconnect', () => { 
        userDisconnected( uid ); 
    });
});