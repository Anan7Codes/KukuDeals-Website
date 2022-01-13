import Winners1 from "@/components/Winners1";

export default function Winners() {
    return (
        <div>
            <div className="py-8">
                <div className="bg-[#7000ff] h-[40rem]  rounded-[15px] px-6 py-5  text-white">
                    <div className="p-4 ml-3">
                        <div className="font-[1000] text-4xl">Winners</div>
                        <div className="text-lg font-bold">
                            All our winners are announced in this section
                        </div>
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
