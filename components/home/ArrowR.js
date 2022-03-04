
export default function ArrowR({ item, isWinnerNextDisabled }) {
    return (
        <div className="relative">
            {item ?
                <div className={`${isWinnerNextDisabled ? 'opacity-50' : null} absolute text-[#ffd601] w-14 h-12 cursor-pointer border border-[#ffd601] rounded-[10px] text-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-16 pt-3 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                :
                <div className="absolute text-black w-14 h-12 cursor-pointer border border-black rounded-[10px] text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-16 pt-3 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            }
        </div>
    )
}
