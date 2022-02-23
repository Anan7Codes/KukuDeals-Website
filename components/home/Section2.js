import { useState, useEffect } from 'react'
import Campaign from "@/components/home/Campaign";
import { supabase } from '@/utils/supabaseClient';

export default function Section2() {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        const FetchCampaigns = async () => {
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
            setCampaigns(data)
        }
        FetchCampaigns()
    }, [])
    if (!campaigns) return <p>No Data</p>
    return (
        <div>
            <p className="text-[26px] text-[#ffd601] pt-5 font-title font-bold">Explore campaigns</p>
            <div className="z-0 mx-auto rounded-[15px]">
                {campaigns?.map(campaign => {
                    return (
                        <Campaign campaign={campaign} key={campaign.id} />
                    )
                })}
            </div>
        </div>
    )
}
