const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv/config")
//register new user
router.post('/register', (req, res) => {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password,
        role: req.body.role,
        link: req.body.link,
        username: req.body.username,
        img:req.body.img
    }
    console.log("USERNAME")
    console.log(req.body.username)

    if(req.body.username){
    

    // Search if email exists or not
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        .then(user => {
            // if email doesn't exist
            if (!user) {
                // hashing step
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    newUser.password = hash
                    User.create(newUser)
                        .then((u) => res.send({msg:"3",userid:u._id,username:u.username}))
                        .catch(err => res.send(err))
                })
            }
            // if email is exist
            else {
                var result = "0"
                if (user.email == req.body.email) {
                    result = "1"
                }
                //maybe I should add a number in here to check
                res.send({msg:result})
            }
        })
        .catch(err => res.send(err))

    }else{

             // Search if email exists or not
    User.findOne({ email: req.body.email})
    .then(user => {
        // if email doesn't exist
        if (!user) {
            // hashing step
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                newUser.password = hash
                User.create(newUser)
                    .then((u) => res.send({msg:"3",userid:u._id}))
                    .catch(err => res.send(err))
            })
        }
        // if email is exist
        else {
            res.send({msg:"1"})
        }
    })
    .catch(err => res.send(err))


        }
})
// Login steps (1-login) 
router.post('/login', (req, res) => {
    //check email is exist or not
    User.findOne({ email: req.body.email })
        .then(user => {
            // if email is exist
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    user.password = "" //  "" we don't want password to appear
                    var paylod = { user }
                    let token = jwt.sign(paylod, process.env.SECRET_KEY, { expiresIn: 1440 })
                    res.send(token)
                }
                // if password isn't the same
                else {
                    res.send("1")
                }
            }
            else {
                // if email doesn't exist
                res.send("2")
            }
        })
        .catch(err => res.send(err))
})
// Logout steps
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    // res.redirect('/user/login');
});
// change password (1-ch)
router.put('/changepass/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    var newPassword = hash
                    User.findByIdAndUpdate(req.params.id, { password: newPassword })
                        .then(() => res.send(`password changed`))
                        .catch(err => res.send(err))
                })
            } else {
                res.json('1')
            }
        }).catch(err => res.send(err))
})
//change details
router.put('/changedetails/:id', (req, res) => {
    User.findOne({$and: [{ username: req.body.username },{_id:{$ne:req.params.id}}]})
        .then(result => {
            if (!result || !result.username) {
                User.findByIdAndUpdate(req.params.id, req.body)
                    .then( user => res.json({msg:"2",user:user}))
                    .catch(err => res.send(err))
            } else {
                res.json({msg:"1"})
            }
        }
        )
        .catch(err => res.json(err))
})
// for update token after edit data 
router.post('/edit/token', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                var paylod = { user }
                let token = jwt.sign(paylod, process.env.SECRET_KEY, { expiresIn: 1440 })
                res.send(token)
            }
            else {
                // if email not exist
                res.send("email is not found")
            }
        })
        .catch(err => res.send(err))
})


//get a user by username
router.get('/username/:username',(req,res)=>{
    User.findOne({username:req.params.username})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

//get user by id
router.get("/:id",(req,res)=>{
    User.findById(req.params.id)
    .then(result=>{
        console.log(result)
        res.json(result)})
    .catch(err=>res.json(err))

})

router.get("/",(req,res)=>{
    User.find()
    .then(r=>res.json(r))
    .catch(err=>res.json(err))
})

module.exports = router
