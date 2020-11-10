const User = require('../models/user');

const userLogged = ( uid = '' ) =>{

    const user = await User.findById( uid );
    user.online = true;

    await user.save();
    return user;
}

const userDisconnected = ( uid = '' ) =>{

    const user = await User.findById( uis );
    user.online = false;

    await user.save();
    return user;
}

module.exports = {
    userLogged,
    userDisconnected
}