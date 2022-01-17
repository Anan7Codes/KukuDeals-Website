import Winners1 from "@/components/Winners1";

export default function Winners() {
    return (
        <div>
            <div className="py-8">
                <div className="bg-[#7000ff] h-[36rem]  rounded-[15px] px-6 pr-2 py-5  text-white">
                    <div className="p-2">
                        <p className="font-[700] tracking-tighter text-3xl">Winners</p>
                        <p className="text-normal font-bold">
                            All our winners are announced in this section
                        </p>
                    </div>
                    <div className="p-4 flex justify-between">
                        <Winners1 />
                        <Winners1 />
                        <Winners1 />
                        <Winners1 />
                    </div>
                </div>
            </div>
        </div>
    )
}
