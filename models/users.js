'use strict';

var mongoose = require('mongoose');
var path = require('path');
var schema = mongoose.Schema;

var UserSchema = new schema({
    full_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
        house: {
            type: String,
            required: false
        },
        address_one: {
            type: String,
            required: false
        },
        address_two: {
            type: String,
            required: false
        },
        area: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        pincode: {
            type: Number,
            require: false
        }
    
})

var users = module.exports = mongoose.model('users', UserSchema)

module.exports.addUser = function (newUser, callback) {
    newUser.save(callback)

}
module.exports.login = function (phone, password, callback) {
    
    var query = { phone: phone, password: password }

    users.findOne(query, callback);
}
module.exports.updateProfile = function (phone, full_name, email, house, address_one, area, city, pincode, callback) {
    var query = { full_name: full_name, email: email,  house: house, address_one: address_one, area: area, city: city, pincode: pincode  }
    users.findOneAndUpdate({ phone: phone }, query, callback);
}

