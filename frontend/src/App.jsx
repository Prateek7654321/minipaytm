import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import { Signup } from "../pages/signup"
import { Dashboard } from "../pages/dashboard"
import { Transfer } from "../pages/transfer"
import { Signin } from "../pages/signin"

function App() {

  return (
    <div>
    <BrowserRouter>
    {/* <Appbar></Appbar> */}
    <Routes>
    <Route path="/dashboard" element={<Dashboard/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/transfer" element={<Transfer/>}></Route>
   
    </Routes>
    </BrowserRouter>
     {/* <Signup></Signup> */}
     </div>
  )
}
// function Appbar()
// {
//   const  navigate =useNavigate();
//   return(
//   <button onClick={()=>{
//     navigate("/signup");
//   }}></button>
// );
// }

export default App
