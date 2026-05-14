import mongoose from 'mongoose';
import 'dotenv/config';
import { User } from './src/models/User.schema.js';

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    const users = await User.find({}, 'username avatar coverImage');
    console.log("Users in DB:");
    users.forEach(u => console.log(`- ${u.username}: avatar=${!!u.avatar}, coverImage=${u.coverImage ? u.coverImage : 'MISSING'}`));
    process.exit(0);
}).catch(console.error);
