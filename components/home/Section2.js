import { useState, useEffect } from 'react'
import Explore from "@/components/home/Explore";

export default function Section2() {
    const [ campaigns, setCampaigns ] = useState([]) 
    
    return (
        <div>
            <p className="text-[26px] text-gray-700 pt-5 font-bold">Explore campaigns</p>
            <div className="z-0 mx-auto rounded-[15px]">
                {campaigns?.map(campaign => {
                    return (
                        // <Explore campaign={campaign} key={campaign.id}/>
                        <Explore key={campaign.id}/>
                    )
                })}
            </div>
        </div>
    )
}
