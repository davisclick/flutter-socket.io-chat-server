const { io } = require('../index');



//Sockets Messages
io.on( 'connection', client => {
    console.log( 'Client connected' );

    client.emit( 'active-bands', bands.getBands() );

    client.on('disconnect', () => { 
        console.log( 'Client disconnected' );
    });

    client.on('flutter-message', ( payload ) => { 
        console.log( payload );
    });

});