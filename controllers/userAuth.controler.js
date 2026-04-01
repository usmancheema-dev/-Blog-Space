import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/User.schema.js";
import { hashpassword, comparedPassword } from '../utils/hashpassword.utility.js';

const registerUser = asyncHandler(async (req, res) => {
  // get user details 
  //  validation check 
  //  check existing user 
  //  user create  
  const { username, email, password } = req.body;


  if ([username, email, password].some((list) => list?.trim() === "")) {

    return res.status(401).json({ msg: 'please provided all fields ' })
  }

  const hashedpassword = await hashpassword(password);

  if (!hashedpassword) {
    return res.status(401).json({ msg: 'cannot hasinng user password ' })
  }

  const existinguser = await User.findOne({ username, email })

  if (existinguser) {
    return res.status(401).json({ msg: 'user credintials exitsts already ' })

  }

  const user = await User.create({
    username: username,
    email: email,
    password: hashedpassword

  })



  if (!user) {
    return res.status(401).json({ msg: ' error occur in creating User ' })

  } else {
    res.status(200).json({ msg: '  User Created Successfuly ' })

  }

  res.end();


})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if ([username, password].some((list) => list?.trim() === "")) {
    return res.status(401).json({ msg: 'please provided username and password ' })
  }
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ msg: 'wrong cridentials for User ' })

  }

  const comparedpassword = await comparedPassword(password, user.password);

  if (!comparedpassword) {
    return res.status(401).json({ msg: 'Wrong password ' })
  }

  res.status(200).json({ msg: '  User login Successfuly ' } , user.username),
  console.log(user.password , password);

})

export { registerUser, loginUser }

