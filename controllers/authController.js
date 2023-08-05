import { comparePassword, hashPassword } from "../helper/authHelper.js";
import user from "../models/user.js";
import userModel from "../models/user.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res)=>{
    try{
        const {name,email,password,phoneNum,address,answer} = req.body
        if(!name){
            return res.send({message:'Name is Required..'})
        }
        if(!email){
            return res.send({message:'Email is Required..'})
        }
        if(!password){
            return res.send({message:'Password is Required..'})
        }
        if(!phoneNum){
            return res.send({message:'Phone Number is Required..'})
        }
        if(!address){
            return res.send({message:'Address is Required..'})
        }
        if(!answer){
            return res.send({message:'Answer is Required..'})
        }

        

        const exisitingUser = await userModel.findOne({email})
        //exisiing users checking
        if (exisitingUser){
            return res.status(200).send({
                success:true,
                message:'Already Register please login',
            })
        }

        const hashedPassword = await hashPassword(password)

        const user =await new userModel({name,email,phoneNum,address,password,hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            message:'user Register successfully',
            user
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            massage:'Error in Registeration',
            error
        })
    }
};

export const loginController = async(req,res) =>{
    try{
        const{ email, password } = req.body
        
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                massage:'Invalid Email or Password..!'
            });
        }

        //Check User
        const user = await userModel.findOne({ email });

        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not registered..'
            });
        }

        const match = await comparePassword(password,user.password);

        // if(!match){
        //     return res.status(200).send({
        //         success:false,
        //         massage:'Invalid Password',
        //     });
        // }

        //token
        const token = await JWT.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'7d',});

        res.status(201).send({
            success:true,
            massage:'login successfully..!',
            user:{
                name:user.name,
                email:user.email,
                phoneNum:user.phoneNum,
                address:user.address,
            },
            token,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error,
        });
    }
};

//forgot password
export const forgotPasswordController = async (req,res) => {
    try{
        const { email, answer, newPassword } = req.body;

        if(!email){
            res.status(400).send({message:"email is required"})
        }
        if(!answer){
            res.status(400).send({message:"answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"new password is required"})
        }

        //check
        const user = await userModel.findOne({email,answer});

        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message : "wrong email or answer"
            });
        }

        const hashed =await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went Wrong",
            error
        })
    }
};

//test controller
export const testController = (req,res) =>{
    try{
        res.send("protected Route");
    }catch(error){
        console.log(error);
        res.send({error})
    }
};
