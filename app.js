const express= require('express');
const { connectDB } = require('./src/utils/database');
const app = express();
const UserRoute = require('./src/route/user');
const imageRoutes = require('./src/route/imageRoutes');
connectDB();

app.use(express.json());
app.use('/user', UserRoute);
app.use('/images', imageRoutes);
// app.use('/product', ProductRoute);

app.listen(3000, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port 3000")
    else 
        console.log("Error occurred, server can't start", error);
    }
);