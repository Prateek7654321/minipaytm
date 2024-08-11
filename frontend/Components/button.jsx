
import { Link } from 'react-router-dom';
export function Button({label,sublabel,to,buttontext,onClick})
{
    return (
      <center className='mb-3'> <button onClick={onClick} className="bg-slate-900 text-white w-1/2   py-1 rounded">{label}</button>
      <div>{sublabel}   
        <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttontext}
      </Link></div></center> 
      
    )
}