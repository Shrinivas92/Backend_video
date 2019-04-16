var express = require('express');
var router = express.Router();
var UsersModel = require('../models/users');

const bcrypt = require('bcrypt');
var config = require('../utils/config');

// new user registration

router.post('/register', (req, res, next) => {
    var data = req.body;
    
    let newUser = new UsersModel({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email,
        password:  bcrypt.hashSync(req.body.password, 8)
    })
   

    UsersModel.findOne({ phone: newUser.phone }, function (err, doc) {
        if (err) {

            return res.status(500).json({
                status: 500,
                message: 'internal server error'
            })

        }
        if (!doc) {
            UsersModel.addUser(newUser, function (err, doc) {
                if (err) {
                    res.status(400).json({
                        status: 400,
                        message: 'bad request'
                    })
                }
                if (newUser) {
                    res.status(200).json({
                        status: 200,
                        message: 'user added successfully',
                        doc: doc
                    })
                }
            })
        }
        if (doc) {
            return res.json({
                status: 400,
                message: 'mobile number already registered'
            })
        }
    })
})

//user login

router.post('/login', (req, res, data) => {
    console.log(req.body.email)
    console.log(req.body.password)
    var query = { 
        $and : [{phone:req.body.phone},{ password : req.body.password }]
    }

    UsersModel.findOne({phone:req.body.phone}, function (err, data) {
        console.log(data)
        if (err) 
            return res.status(500).send(err);
            
        if(!data)
            return res.status(404).send(err);

        var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false});
       
        });

          res.send({
                status  : 200,
                message : 'Login success',
                data : data,
             
        })
    })

// user profile edit
router.post('/edit', (req, res, next) => {
    var data = req.body;
    if (
        !data ||
        !data.full_name ||
        !data.phone ||
        !data.email
    ) {
        return res.json({
            status: 400,
            message: 'Bad request'
        })
    } else {
        var full_name = data.full_name;
        var email = data.email;
        var phone = data.phone;

        var house = data.house;
        var address_one = data.address_one;

        var area = data.area;
        var city = data.city;
        var pincode = data.pincode;

        UsersModel.updateProfile(phone, full_name, email , house, address_one, area, city, pincode, (err, user) => {

            if (err) {
                return res.json({
                    status: 500,
                    message: 'internal server error'
                })
            }
            if (!user) {
                return res.json({
                    status: 400,
                    message: 'user not found'
                })
            }
            if (user) {
                return res.json({
                    status: 200,
                    message: 'updated successfully',
                    user: data
                })
            }

        })

    }

})

module.exports = router
