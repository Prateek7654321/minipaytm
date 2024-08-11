import { Heading } from "../Components/Header";
import { Subheading } from "../Components/subheading";
import { Inputbox } from "../Components/inputbox";
import { Button } from "../Components/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Signin()
{  const [username,setUsername]=useState("sd");
    const [password,setPassword]=useState("sdds");
    const navigate=useNavigate();
    return(
       
        <div className="min-h-screen bg-slate-400 flex   justify-evenly">
            <div className=" mt-20 w-6/12 flex  flex-col  bg-slate-200 justify-evenly h-3/5 gap-y-2.5 ">
        <Heading label={"Sign in"}></Heading>
        <Subheading label={"Enter your credentials to access your account"}></Subheading>
        <Inputbox onChange={(e)=>{
            setUsername(e.target.value);
        }} label={"Email"} placeholder={"itsprateek0444@gmail.com"}></Inputbox>
        <Inputbox onChange={(e)=>{
            setPassword(e.target.value);
        }} label={"Password"} placeholder={"1234"}></Inputbox>
        <Button onClick={async ()=>{
           const res=await axios.post("http://localhost:3000/api/v1/user/signin",{username:username,
                password:password
            });
          localStorage.setItem("token",res.data.token);
          navigate("/dashboard");
        }} label={"Sign in"} sublabel={"Don't have an account ?"} buttontext={"Sign up"} to={"http://localhost:5173/signup"}></Button>
        </div>
        </div>
    )
}