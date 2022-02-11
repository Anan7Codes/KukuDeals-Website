import { useState, useEffect } from 'react'
import Explore from "@/components/home/Campaign";
import { supabase } from '@/utils/supabaseClient';

export default function Section2() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const FetchCampaigns = async () => {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
            console.log(data, error);
            setCampaigns(data)
        }
        FetchCampaigns()
    }, [])
    if (!campaigns) return <p>No Data</p>
    return (
        <div>
            <p className="text-[26px] text-gray-700 pt-5 font-bold">Explore campaigns</p>
            <div className="z-0 mx-auto rounded-[15px]">
                {campaigns?.map(campaign => {
                    return (
                        <Explore campaign={campaign} key={campaign.id} />
                    )
                })}
            </div>
        </div>
    )
}
