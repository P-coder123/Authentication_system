const express =require('express');
const app = express();
const bcrypt = require('bcrypt')
const router=require('./routes/user')
const mongoose=require('mongoose')

//const dotenv= require('dotenv')
const  bodyParser = require('body-parser');


//dotenv.config()


//Genrate connection

mongoose.connect("mongodb://localhost:27017/AUTH")
.then(()=>console.log("Mogoose connected"))
.catch((err)=>console.log('Mongo error',err))






//route middlewaere


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/user',router)








const port = 4000;

app.listen(port,()=>{
    console.log(`server run at ${port}`)
})