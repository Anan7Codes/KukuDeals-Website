import Draw1 from "./Draw1";

export default function Draw() {
    return (
        <div>
            <div className="">
                <div className=" bg-white h-[40rem] mb-6 rounded-[15px] px-6 py-5  ">
                    <div className="p-2 ">
                        <div className="font-[1000] pb-2 text-3xl text-gray-700">Draws</div>
                        <p className="text-base text-gray-700 font-semibold tracking-tight	leading-5	">
                            See all of our upcoming draws here for all campaigns and <br /> the campaigns you participated in.
                        </p>
                    </div>
                    <div className="p-2 flex justify-between ">
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
