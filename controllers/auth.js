const { response } = require('express');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const createUser = async (req, res = response) => {

    const { email } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'The email exist in the database'
            });
        }
            
        const user = new User( req.body );
        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Contact the admin service'
        });
    }

};

module.exports = {
    createUser
}