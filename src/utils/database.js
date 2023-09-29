const mongoose= require('mongoose');

exports.connectDB= async () => {
    console.log("inside connect db");
    mongoose.connect('mongodb://127.0.0.1:27017/node-project').then(()=>{
        console.log('Database connected successfully!');
    }).catch((err)=>{
        console.log('Database connection Error!', err);
    })
}