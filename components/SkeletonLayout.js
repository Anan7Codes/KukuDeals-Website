import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


function SkeletonLayout({children}) {
    
    return (
        <SkeletonTheme baseColor="#2c2c2c" highlightColor="#161616">
            <div className="bg-[#161616]">
                <div className="mx-auto max-w-[1266px] container px-5 pt-4 overflow-x-hidden min-h-screen">   
                    <Skeleton className="h-[55px] mb-4" style={{borderRadius: 15}} />
                        {children}               
                    <Skeleton className="h-[50px] mt-4" style={{borderRadius: 15}} />
                </div>
            </div>
        </SkeletonTheme>
        
    )
}

export default SkeletonLayout