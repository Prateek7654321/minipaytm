import { Heading } from "../Components/Header";
import { Subheading } from "../Components/subheading";
import { Inputbox } from "../Components/inputbox";
import { Button } from "../Components/button";
import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export   function Signup()
{ const navigate=useNavigate();
    const [firstName,setFirstname]=useState("njk");
    const [lastName,setLastname]=useState("jn");
    const [email,setEmail]=useState("njn");
    const [password,setPassword]=useState("jkn");
    return(
        <div className="min-h-screen bg-slate-400 flex   justify-evenly">
            <div className=" mt-20 w-6/12 flex  flex-col  bg-slate-200 justify-evenly h-3/5 gap-y-2.5 mb-4 ">
        <Heading label={"Sign up"}></Heading>
        <Subheading label={"Enter your information to create an account"}></Subheading>
        <Inputbox onChange={(e)=>{
            setFirstname(e.target.value);
        }} label={"First Name"} placeholder={"Prateek"}></Inputbox>
        <Inputbox onChange={(e)=>{
            setLastname(e.target.value);
        }}label={"Last Name"} placeholder={"Maheshwari"}></Inputbox>
        <Inputbox  onChange={(e)=>{
            setEmail(e.target.value);
        }} label={"Email"} placeholder={"itsprateek0444@gmail.com"}></Inputbox>
        <Inputbox  onChange={(e)=>{
            setPassword(e.target.value);
        }} label={"Password"} placeholder={"1234"}></Inputbox>
        <Button onClick={async ()=>{
         const res= await axios.post("http://localhost:3000/api/v1/user/signup",{
                username:email,
                firstName:firstName,
                lastName:lastName,
                password:password
            })
        localStorage.setItem("token",res.data.token);
       navigate("/dashboard");//so it can be stored in some storage for doing authmiddleware
        }} label={"Sign up"} sublabel={"Already have an account ?"} buttontext={"Sign in"} to={"http://localhost:5173/signin"}></Button>
        </div>
        </div>
    )
}