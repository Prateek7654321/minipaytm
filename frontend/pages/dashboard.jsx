import axios from "axios";
import { Appbar } from "../Components/appbar"
import { Balance } from "../Components/balance"
import { User } from "../Components/user"
import { useState } from "react";
import { useEffect } from "react";
export function Dashboard()
{ const [amount,setAmount]=useState(0);
  const token=localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    // Define the async function inside useEffect
     const fetchdata=async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `${token}` // Use "Bearer " before the token if required
          }
        });
        console.log(res.data);
        setAmount(res.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchdata();

    // Check if token is available before making the request
   
  }, [token]); 
    return(
      <div className="bg-white h-screen w-screen ">
   <Appbar></Appbar>
   <br/>
   <Balance amount={amount}></Balance>
   <br/>
   <User></User>
      </div>
    )
}