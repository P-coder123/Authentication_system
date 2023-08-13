const express = require('express')
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{

    const { name,email, password } = req.body;
    const existEmail = await User.findOne({ email });

    if(existEmail){
        return res.status(400).send("Email Already exist")
    }


    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);


    try{
        console.log(req.body)
        const user = new User({
            name,
            email,
         password: hashedPassword,
        });

        const token = await user.genrateToken()

        const addData = await user.save()
         res.send(addData)
        

    }catch(e){
         res.status(401).send(e);

    }
})













//Login user

router.post('/login', async(req,res)=>{

    try{

        const email= req.body.email;
        const password = req.body.password

        const useremail= await User.findOne({email : email })

        const ismatch = await bcrypt.compare(password, useremail.password)

        const token = await useremail.genrateToken()
        //return token;

        if(ismatch){
            return res.status(201).send('User Login Sucessfully')
        }else{
            res.status(400).send('Invalid Password')
        }

    }catch(error){
        res.status(400).send("Invalid Login details" + error)
        console.log(error)
    }
})









// /**  CREATE TOKE4N */

// const creatoken = async()=>{

//     const token = await jwt.sign({_id : "64b399ab60adba396b1d1acb"},"asdfgzxcvbnmlkjuytrtedfrtgyhujik")
//     console.log(token)

//     const userVerify = await jwt.verify(token,"asdfgzxcvbnmlkjuytrtedfrtgyhujik")

//     console.log(userVerify)
// }
// creatoken()

 module.exports=router;