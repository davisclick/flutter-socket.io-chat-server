const User = require('../models/user');
const Message = require('../models/message');

const userLogged = async ( uid = '' ) =>{

    const user = await User.findById( uid );
    user.online = true;

    await user.save();
    return user;
}

const saveMessage = async ( payload ) =>{
    
    /*
        payload{
            from: "",
            to: "",
            message: ""
        }
    */

    try {

        const message = new Message( payload );
        await message.save();

        return true;
        
    } catch (error) {
        return false;
    }
}

const userDisconnected = async ( uid = '' ) =>{

    const user = await User.findById( uid );
    user.online = false;

    await user.save();
    return user;
}

module.exports = {
    userLogged,
    saveMessage,
    userDisconnected
}