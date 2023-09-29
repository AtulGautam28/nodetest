const express= require('express');
const User= require('../controller/user');

const Router= express.Router();
var app = express();

app.use(express.json());

Router.get('/get', User.getUser);
Router.get('/userId', User.getIdUser);
Router.get('/removeId', User.removeUser);
Router.post('/addUser', User.addUser);
Router.post('/register', User.register);
Router.post('/login', User.login);
Router.put('/update', User.update);


module.exports = Router;