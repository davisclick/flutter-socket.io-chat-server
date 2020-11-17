const Message = require('../models/message')

const getChat = async( req, res ) => {

    const myID = req.uid;
    const messageFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{ from: myID, to: messageFrom }, {from: messageFrom, to: myID}]
    })
    .sort({ createdAt: 'desc' })
    .limit(30);

    res.json({
        ok: true,
        msg: last30
    });

}

module.exports = {
    getChat
}