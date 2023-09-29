const express = require('express');
const User= require('../model/user');
const crypto = require('crypto');
const req = require('express/lib/request');

exports.getUser= async (req, res)=>{
    User.find().then((data)=> res.send(data));
    console.log("server accessed.");
};

exports.getIdUser= async (req, res)=>{
    User.findById(req.body._id).then((data)=> res.send(data));
    console.log("server accessed.");
};

exports.addUser = (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
    .update(req.body.password)
    .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    console.log(hash);
    new User(req.body).save().then((data)=>  res.send(data));
};

 exports.removeUser = (req, res) => {
    const userId = req.body._id;
    User.removeUser(userId)
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User removed successfully', removedUser: data });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error removing user' });
      });
  };

  exports.register = async (req, res, next) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
    .update(req.body.password)
    .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    const { email, password } = req.body
    if (password.length < 6) {
      return res.status(400).json({ message: "Password less than 6 characters" })
    }
    try {
      await User.create({
        email,
        password,
      }).then(user =>
        res.status(200).json({
          message: "User successfully created",
          user,
        })
      )
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    }
  };

  exports.login = async (req,res,next) =>{
    try{
        const { email, password } = req.body
        const user = await User.findOne({email,password});

        if(!user){
            res.status(401).json({
                message:"Login not successfully.",
                error:"Email and Password Incorrect.",
            })
        }else{
            res.status(200).json({
                message:"Login Successfully.",
                user,
            })
        }
    } catch (error){
        res.status(400).json({
            mesage:"An Error occurred",
            error:error.message,
        })
    }
  };

  exports.update = async (req,res,next)=>{
    
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
    .update(req.body.password)
    .digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    const { id, email, password, firstName, lastName } = req.body;
    if(id){
        await User.findById(id).then((user)=> {

            user.email = email;
            user.password = password;
            user.firstName = firstName;
            user.lastName = lastName;
            user.save()

            res.status(201).json({ message: "Upadted Successfully." ,user});

        })
        .catch((error) => {
            res.status(400).json({ message: "An error occurred", error:error.message});
        })
    }else{
        res.status(401).json({
            message:"User not found",
        })
    }
  };
