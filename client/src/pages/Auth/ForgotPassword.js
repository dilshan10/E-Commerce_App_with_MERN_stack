import "../../style/AuthStyle.css";

import React,{useState} from 'react'
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
    const[email,setEmail] = useState("");
    const[newPassword,setNewPassword] = useState("");
    const[answer,setAnswer] = useState("");
  

    const navigate = useNavigate();
  

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post("/api/v1/auth/forgot-password",
            {email,newPassword,answer});
            if(res && res.data.success){
                toast.success(res.data.message);
                
                navigate('/login');
            }else{
                toast.error(res.data.message)
            }
        } catch(error){
            console.log(error);
            toast.error('Something went wrong..!')
        }
    }
  return (
    <Layout title={"ForgotPassword"}>
       <div className="register">
                
                <form onSubmit={handleSubmit}>

                <h1 className="title">RESET PASSWORD</h1>

                   
                    <div className="mb-3">
                            <input type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="form-control" id="exampleInputEmail" placeholder="Enter Your E-mail" required
                            />
                    </div>
                    
                    <div className="mb-3">
                            <input type="text"
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            className="form-control" id="exampleInputEmail" placeholder="What is the Answer 2 + 2" required
                            />
                    </div>

                    <div className="mb-3">
                            <input type="password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" required
                            />
                    </div>

                    
                    
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">RESET PASSWORD</button>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={()=>{navigate("/login")}}>Login</button>
                    
                    </form>
            </div>
    </Layout>
  )
}

export default ForgotPassword
