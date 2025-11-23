//config all lib
const express=require('express');
require("dotenv").config();
// const pool=require('./dataconfig/dbConnection');
const app=express();
const cors = require("cors")
const linkrouter=require("./router/linkRouter")
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','DELETE','PUT','PATCH','OPTIONS'],
  credentials: true
}));

//middleware
app.use(express.json());

console.log("DATABASE_URL:", process.env.DATABASE_URL);

app.use((req, res, next)=>{
    console.log("inside middleware");
    console.log(req.method, req.url);
    next();
});

//links api 
app.use("/api" ,linkrouter );

//server listen
app.listen(3333,()=>{
    console.log("running on port number 3333");
})
