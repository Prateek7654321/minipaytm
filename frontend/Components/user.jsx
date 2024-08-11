
import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
let t=0;
export function User()
{  const navigate=useNavigate();
    const [people,setpeople]=useState([]);
const [filter,setFilter]=useState("");
useEffect(
     ()=>{ const fetchd=async()=>{await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then((res)=>{
    setpeople(res.data.Users);
})}
fetchd();},[filter])
   
    return (
        <div className="ml-3 mr-3 px-3  py-3 rounded-lg">
            <span className="font-bold">Users</span>
            <br/>
            <br/>
            <input onChange={(e)=>{
               setFilter(e.target.value);
            }}
    className="w-full border-2 border-black focus:outline-none  rounded-lg p-2"
    type="text" 
    placeholder="Search Users..."
/>
<br/>
<br/>
            <div className="flex flex-col">
               
                 {/* <div className="pt-3">{people}</div> */}
                {people.map((e)=>{
                  return  <div className="ml-3 mr-3 px-3  py-3 flex justify-between w-full"> <div className="pt-3" key={++t}>{e.firstName}</div>  <div>
                  <button onClick={()=>{
                    navigate("/transfer?userid="+e.userid+"&name="+e.firstName);
                  }}  className="bg-slate-400 bg-sm ml-2 mr-5 px-2 py-2 rounded-sm ">Send Money</button>   </div>
                     </div>  
                })}
          
        </div>
        </div>
    )
}