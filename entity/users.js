const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema  = new mongoose.Schema({


    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        unique: true,
        required: [true, 'pleas enter the number'],

    },
    password: {
        type: String,
        required: [true, 'pleas enteer the password'],
        minlenghth: [6, 'minumum password is 6 characters'],
    }
}, { timestamps: true });


userSchema.pre('save' ,async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt)
    next();
    } )
    
    
    userSchema.statics.login = async function(name, number, password){
    const user = await this.findOne({number});
    if(user){
    const auth =await bcrypt.compare(password , user.password)
    if(auth){
        return user
    }
    throw Error('incorrect password')
    }
    throw Error('incorrect email')
    
    
    
    }



const user = mongoose.model('user' , userSchema );
module.exports = user ;