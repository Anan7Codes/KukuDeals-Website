import { useState } from "react";

export default function ToggleSwitch({item,sendDataToParent}) {
    const [check, setCheck] = useState();
    const handleCheck = ()=>{  
        item.donate = !item.donate ; 
        setCheck(item.donate);
        console.log("child check",check);
        sendDataToParent(check);
        // if(check=== true){
        //     input:checked
        // }else{
        //     input:unchecked
        // }
    }
    return (
            <div className="flex items-center justify-center w-full mb-12">
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" onClick={handleCheck} className="sr-only" />
                        <div className="block bg-black w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-[#ffd601] w-6 h-6 rounded-full transition"></div>
                    </div>
                </label>
            </div>
    )
}
