const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose'); 
dotenv.config();
// Import Routes
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');
const postRoute = require('./routes/posts');


// connected to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true},
()=>
{
    console.log("connected to database")
});
mongoose.set('strictQuery', false);


//MIDDLEWARE
app.use(express.json());
// Route Middleware
app.use('/api/user',authRoute);
app.use('/api',blogRoute);
app.use('/api/posts',postRoute);
// server
app.listen(3000,()=>{
    console.log('server is running on prot 3000');
})