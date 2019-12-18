const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

//create projects
router.post("/create", (req, res) => {
  let project = new Project()

  project.title = req.body.title
  project.description = req.body.description
  project.image = req.body.image
  project.github = req.body.github
  project.link = req.body.link
  project.user = req.body.user

  project.save()
    .then(() => res.json("Successfully added new project"))
    .catch(err => res.json(err))
})

//get a specific user's projects
router.get("/developer/:id", (req, res) => {
  Project.find({ user: req.params.id })
    .then(p => res.json(p))
    .catch(err => res.json(err))
})

//get a specific project
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then(p => res.json(p))
    .catch(err => res.json(err))
})


//delete a specific project
router.delete("/:id", (req, res) => {
  Project.findByIdAndRemove(req.params.id, (err, data) => {
    if(err){
      console.log(err)
    res.json(err)}
  })
    .then(() => res.json("Successfully deleted"))
    .catch(err => res.json(err))
})


//update a specific project
router.put("/:id", (req, res) => {
  // let projectUpdate = {
  //   title: req.body.title,
  //   image:req.body.image,
  //   github: req.body.github,
  //   link: req.body.link,
  //   description: req.body.description
  // }

  Project.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
    if (err)
      res.json(err)
  })
    .then(() => { res.json("successfully updated") })
    .catch(err => { res.json(err) })
})

//get all projects  ---- I don't need this route for now -- delete later
router.get("/", (req, res) => {
  Project.find()
    .then((p) => { res.json(p) })
    .catch((err) => {
      res.json({ error: err });
    });
})

module.exports = router