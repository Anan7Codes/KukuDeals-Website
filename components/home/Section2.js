import { useState, useEffect } from 'react'
import Explore from "@/components/home/Explore";
import { nhost } from "@/utils/nhost"

export default function Section2() {
    const [ campaigns, setCampaigns ] = useState([])
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const { data } = await nhost.graphql.request(`
                    query MyQuery {
                        Campaigns {
                            id
                            ProductName
                            ProductDescription
                            GiftName
                            GiftDescription
                            SoldOutCoupons
                            TotalCoupons
                            Price
                            DrawDate
                            Image
                        }
                    }
                `);
                setCampaigns(data.Campaigns)
                console.log(data);
            } catch (e) {
                console.error('Error')
            }
        }
        fetchCampaigns()
    },[])
    
    if(!campaigns) return <p>No Campaigns</p>

    return (
        <div>
            <p className="text-[21px] text-gray-700 pt-5 font-bold">Explore campaigns</p>
            <div className="z-0 mx-auto rounded-[15px]">
                {campaigns?.map(campaign => {
                    return (
                        <Explore campaign={campaign} key={campaign.id}/>
                    )
                })}
            </div>
        </div>
    )
}
