const express= require('express');
const Profile= require('../model/profile.model');
const middleware = require("../middleware");
const Router= express.Router();

const profile = Profile({
    email:req.body.email,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
})

module.exports = Router;