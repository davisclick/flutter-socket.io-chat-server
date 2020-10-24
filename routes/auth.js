/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validatorFields } = require('../middlewares/validator-fields');
const { validateJWT } = require('../middlewares/validator-jwt');

const router = Router();

router.post('/new', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    validatorFields
] , createUser);

router.post('/',[
    check('password', 'The password is required').not(),
    check('email', 'The email is required').isEmail()
], login)

router.get('/renew',validateJWT, renewToken);

module.exports = router;