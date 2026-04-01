// this will be password hasing utility :
import bcrypt from 'bcrypt';


const saltRounds = 12;

async function hashpassword(password) {

    try {
    const hashedPassword =  bcrypt.hash(password,saltRounds);
    return hashedPassword;
    } catch (error) {
        console.log(` ${error} occurs during hasing password `);
        
    }

}

// console.log(hashpassword('PPAPAP').then((DATA)=> console.log(DATA)))

async function comparedPassword(password , hashedPassword ) {

    try {
    const comparedPassword =  bcrypt.compare(password,hashedPassword);
    return comparedPassword;
    } catch (error) {
        console.log(` ${error} occurs during comparing  password `);
        
    }

}

export{hashpassword,comparedPassword};