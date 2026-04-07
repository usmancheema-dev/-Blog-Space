// there i will make an userSchema :

import mongoose  from "mongoose";

const userSchema =   mongoose.Schema({
    username:{
        type : String,
        unique : true,
        required : true,
        index : true
    },email:{
    type : String,
    required : true,
    unique : true,
    lowercase: true,
    trim: true
},
    
    password:{
        type : String,
        required :true
    },

    followers:[
        {
        type : mongoose.Schema.Types.ObjectId,
            ref :"User"
        }
    ],

    following:[
        {
        type : mongoose.Schema.Types.ObjectId,
            ref :"User"
        }
    ],

    imageAvatar :{
        type : String
    },

    about:{
        type : String,
        default : ""
    },
     refreshToken:{
        type : String
    }
},{timestamps: true})
/** @type {import('../models/User.schema.js').User} */
const  User = mongoose.model('User' , userSchema);

export {User}