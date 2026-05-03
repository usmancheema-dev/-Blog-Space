// this is an middlerware for the authorization : 
import jwt from 'jsonwebtoken';
import { User } from '../models/User.schema.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const JwtVerification = asyncHandler(async (req, res, next) => {


  const headers = req.headers['authorization'];
  const token = headers && headers.split(" ")[1];

  if (!headers) return res.status(401).json(' Bad Request ')


  if (!token) return res.status(401).json({ message: " Unauthorized Access " });

  try {

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload?._id).select("-password -refreshToken")

    if (!user) {
     return res.status(401).json({ msg: " Invalid Access Token" });
    }

    req.user = user;
    next();


  } catch (error) {
    return res.status(401).json({ msg: " Invalid or expired access token " })
  }


})


export { JwtVerification };