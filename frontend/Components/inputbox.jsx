export function Inputbox({label,placeholder, onChange})
{
    return(
        <div>
            <div className="font-bold text-1xl ml-5 mb-1">{label}</div>
            <input onChange={onChange} className="w-11/12 p-2 border border-gray-300 rounded gap-y-0.5 ml-5 mr-1" placeholder={placeholder}></input>
        </div>
    )
}