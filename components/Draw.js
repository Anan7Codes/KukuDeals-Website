import Draw1 from "./Draw1";

export default function Draw() {
    return (
        <div>
            <div className="">
                <div className=" bg-white h-[50rem]  rounded-[15px] px-6 py-5  text-gray-700">
                    <div className="p-4 ml-3">
                        <div className="font-[1000] text-4xl">Draws</div>
                        <div className="text-lg font-bold">
                            See all of our upcoming draws here for all campaigns and <br /> the campaigns you participated in.

                        </div>
                    </div>
                    <div className="p-4 flex justify-between ">
                        <Draw1 />
                        <Draw1 />
                        <Draw1 />
                        <Draw1 />
                    </div>
                </div>
            </div>
        </div>
    )
}
