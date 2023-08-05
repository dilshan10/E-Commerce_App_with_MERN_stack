import bcrypt from "bcrypt";

export const hashPassword = async(password)=>{
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound) 
        return hashPassword;
    }
    catch(error){
        console.log(error)
    }
};

export const comparePassword = async (password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword)
};