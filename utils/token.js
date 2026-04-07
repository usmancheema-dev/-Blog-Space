import jwt from 'jsonwebtoken';
import crypto  from 'crypto';
import { hashpassword, comparedPassword } from '../utils/hashpassword.utility.js';


const genrateAccessToken = (userId)=>{
    return jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

const genrateRefreshToken = (userId)=>{
    return jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export {genrateAccessToken , genrateRefreshToken};