const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existEmail = await User.findOne({ email });

        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'The email exist in the database'
            });
        }
            
        const user = new User( req.body );

        //Password encryption 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        //Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
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