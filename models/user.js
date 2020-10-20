
const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    online: {
        type: Boolean,
        default: false
    },
});

module.exports = model('User', UserSchema);