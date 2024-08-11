import { useLocation, useSearchParams } from "react-router-dom"
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Sendmoney(){
    const navigate=useNavigate();
    const token=localStorage.getItem("token");
// const location=useLocation();
    const [searchParams]=useSearchParams();
    const[amount,setAmount]=useState(0);

    const name = searchParams.get("name");
    const userid = searchParams.get("userid");
   

    return (
        <div className="bg-white h-min w-2/5 px-5 py-5 flex flex-col gap-1 w-2/5 ">
            <div className="text-center font-bold text-xl">Send Money</div>
            <br></br><br></br>
                <span>{name}</span><br>
                </br>
                <span>Amount (in Rs)</span>
                <br/>
                <input onChange={(e)=>{
                    setAmount(e.target.value);
                }} type="number" placeholder="Enter Amount"></input>
                <br></br>
                <button onClick={async()=>{
                  const res=  await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:userid,
                        amount:amount
                    },{
                        headers:{
                           Authorization: `${token}`
                        }
                    });
                    if(res.data.msg=="done")
                    {
                      alert("Payment done successfully");
                      navigate("/dashboard");
                    }
                    }} className="bg-slate-400 py-2">Initiate Transfer</button>
            

        </div>
    )
} 