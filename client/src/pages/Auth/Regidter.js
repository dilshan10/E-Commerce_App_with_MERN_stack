import "../../style/AuthStyle.css";

import React,{useState} from 'react'
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const Regidter = () => {

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[address,setAddress] = useState("");
    const[phoneNum,setPhoneNum] = useState("");
    const[password,setPassword] = useState("");
    const[answer,setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post("/api/v1/auth/register",
            {name,email,address,phoneNum,password,answer});
            if(res && res.data.success){
                navigate('/login');
                toast.success(res.data.message);
                
            }else{
                toast.error(res.data.message)
            }
        } catch(error){
            console.log(error);
            toast.error('Something went wrong..!')
        }
    }

  return (
        <Layout title="Register-">
            <div className="register">
                <h1 className="title">Register FORM</h1>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                            <input type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                             className="form-control" id="exampleInputName" placeholder="Enter Your Name" 
                             required
                             />
                    </div>

                    <div className="mb-3">
                            <input type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className="form-control" id="exampleInputEmail" placeholder="Enter Your E-mail" required
                            />
                    </div>

                    <div className="mb-3">
                            <input type="text"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            className="form-control" id="exampleInputAddress" placeholder="Enter Your Address" required
                            />
                    </div>

                    <div className="mb-3">
                            <input type="text"
                            value={phoneNum}
                            onChange={(e)=>setPhoneNum(e.target.value)}
                            className="form-control" id="exampleInputPhone" placeholder="Enter Your Phone Number" required
                            />
                    </div>

                    <div className="mb-3">
                            <input type="password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="form-control" id="exampleInputPassword1" placeholder="Enter Your Password" required
                            />
                    </div>
                    <div className="mb-3">
                            <input type="text"
                            value={answer}
                            onChange={(e)=>setAnswer(e.target.value)}
                            className="form-control" id="exampleInputPassword1" placeholder="What is the Answer 2 + 2" required
                            />
                    </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
            </div>
        </Layout>
    )
}

export default Regidter
