import mongoose from "mongoose"

const DBConnection = async () => {
            try {
            const connect = await mongoose.connect(process.env.MONGODB_URL);
            console.log(` database connected successfuly:`);
            

            } catch (err) {
                console.log(`database connection have some problem :${err}`);
                
            }
}

export {DBConnection};