const express = require('express');
const router = express.Router();
const Jobs = require('../models/Job');





//create a job
router.post("/create", (req, res) => {
    let job = new Jobs()

    job.title = req.body.title
    job.description = req.body.description
    job.budget = req.body.budget
    job.deadline = req.body.deadline
    job.technologies = req.body.technologies
    job.status = "unassigned"
    job.emp_id = req.body.emp_id

    job.save()
        .then(() => res.json("Successfully added new jobs"))
        .catch(err => res.json(err))
})

//add a developer to the request page
router.put("/addreq/:id", (req, res) => {
    Jobs.findByIdAndUpdate(req.params.id, { $addToSet: { requests: req.body.requests } }, (err, updatedModel) => {
        
        if (err) {
            res.json(err)
        }
    })
        .then(() => res.json("successfully added new request"))
        .catch(err => { res.json(err) })
})

//get employer's jobs
router.get("/employer/:id", (req, res) => {
    Jobs.find({ emp_id: req.params.id })
        .then(j => res.json(j))
        .catch(err => res.json(err))
})

//get developer's jobs
router.get("/developer/:id", (req, res) => {
    Jobs.find({ dev_id: req.params.id })
        .then(j => res.json(j))
        .catch(err => res.json(err))
})

//assign a developer to the job
router.put("/developer/:id",(req,res)=>{

    let jobUpdate = {
        dev_id: req.body.dev_id,
        status: "assigned",
        requests:[]
      }

    Jobs.findByIdAndUpdate(req.params.id,jobUpdate,(err,updatedModel)=>{
        if(err)
        res.json(err)
    })
    .then(()=>res.json("successfully updated"))
    .catch(err=>res.json(err))
})

//update a job
router.put("/:id", (req, res) => {
    Jobs.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
        if (err)
            res.json(err)
    })
        .then(() => res.json("successfully updated"))
        .catch(err => res.json(err))
})

//delete a job
router.delete("/:id", (req, res) => {
    Jobs.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
            res.json(err)
        }
    })
        .then(() => res.json("Successfully deleted"))
        .catch(err => res.json(err))
})

//get a specific job
router.get("/:id", (req, res) => {
    Jobs.findById(req.params.id)
        .then(j => res.json(j))
        .catch(err => res.json(err))
})

//get all jobs
router.get("/", (req, res) => {
    // status : "unassigned"
    Jobs.find()
        .then((m) => { 
            res.json(m) })
        .catch((err) => {
            res.json({ error: err });
        });

})


module.exports = router