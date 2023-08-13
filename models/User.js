const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
require('dotenv').config();



const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password :String,
    tokens : [{
        token :{
            type:String,
            require : true
        }
    }]
})

userSchema.methods.genrateToken = async function(req,res){
    try{
        const token = await jwt.sign({_id : this._id},process.env.SECRET_KEY)
        console.log(token)
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token;
    }catch(error){
        res.status(400).send('token not genrate')
        console.log('this is the'+error)
    }
}

const User = mongoose.model('User',userSchema)

module.exports = User;