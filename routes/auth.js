/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser } = require('../controllers/auth');
const { validatorFields } = require('../middlewares/validator-fields');

const router = Router();

router.post('/new', [
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    validatorFields
] , createUser);

module.exports = router;