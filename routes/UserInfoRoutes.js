const express = require('express');
const router = express.Router();
const UserInfo = require('../models/UserInfo');
//create Info
router.post("/create", (req, res) => {
  let Info = new UserInfo()
  Info.user= req.body.user
  Info.img= req.body.img
  Info.jobPosition  = req.body.jobPosition
  Info.brandstatment= req.body.brandstatment
  Info.github =  req.body.github
  Info.linkdin =  req.body.linkdin
  Info.twitter =  req.body.twitter
  Info.education= req.body.education
  
  Info.save()
    .then((r) => {res.json(r)})
    .catch(err => res.json(err))
})

//get a specific user's info
router.get("/:id", (req, res) => {
    UserInfo.find({ user: req.params.id })
    .populate('user')
    .then(p => res.json(p))
    .catch(err => res.json(err))
})

//update a specific project
router.put("/:id", (req, res) => {
  Info.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    if (err)
      res.json(err)
  })
    .then(() => { res.json("successfully updated") })
    .catch(err => { res.json(err) })
})


router.get("/",(req,res)=>{
    UserInfo.find()
    .then(r=>res.json(r))
    .catch(err=>res.json(err))
})
//get all projects  ---- I don't need this route for now -- delete later
module.exports = router