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

const login = async ( req, res = response ) =>{

    const { email, password } = req.body;

    try {
        
        const userDB = await User.findOne({email});

        if( !userDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'Invalid password'
            });
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            user: userDB,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Contact the administrator'
        });
    }
    
}

module.exports = {
    createUser,
    login
}