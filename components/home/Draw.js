import Draw1 from "./DrawCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "@/components/home/ArrowL";
import ArrowR from "@/components/home/ArrowR";
import { useState } from "react";

const responsive = {
    0: { items: 1 },
    1024: { items: 4 },
};
const items = [
    <div className="item" data-value="0" key="0">
        <Draw1 />
    </div>,
    <div className="item" data-value="1" key="1">
        <Draw1 />
    </div>,
    <div className="item" data-value="2" key="2">
        <Draw1 />
    </div>,
    <div className="item" data-value="3" key="3">
        <Draw1 />
    </div>,
    <div className="item" data-value="4" key="4">
        <Draw1 />
    </div>,
    <div className="item" data-value="5" key="5">
        <Draw1 />
    </div>,
    <div className="item" data-value="6" key="6">
        <Draw1 />
    </div>,
    <div className="item" data-value="7" key="7">
        <Draw1 />
    </div>,
];

export default function Draw() {
    const [index, setIndex] = useState(0);
    return (
        <div className=" bg-gray-300 h-[40rem] mb-6 rounded-[15px] px-6 py-5  ">
            <div className="p-2 ">
                <div className="font-[1000] pb-2 text-3xl text-gray-700">Draws</div>
                <p className="text-base text-gray-700 font-semibold tracking-tight	leading-5	">
                    See all of our upcoming draws here for all campaigns and <br /> the campaigns you participated in.
                </p>
            </div>
            <div className="mt-6">
                <AliceCarousel
                    mouseTracking
                    items={items}
                    responsive={responsive}
                    onSlideChanged={(e) => {
                        setIndex(e.item);
                    }}
                    renderPrevButton={() => {
                        return index == 0 ? (
                            <div className="absolute -top-24 right-24 opacity-50">
                                <ArrowL />
                            </div>
                        ) : (
                            <div className="absolute -top-24 opacity:100 right-24">
                                <ArrowL />
                            </div>
                        );
                    }}
                    renderNextButton={() => {
                        return index >= items.length - 4 ? (
                            <div className="absolute -top-24 opacity-50 right-20">
                                <ArrowR />
                            </div>
                        ) : (
                            <div className="absolute -top-24 right-20">
                                <ArrowR />
                            </div>
                        );
                    }}
                    disableDotsControls="true"
                    controlsStrategy="alternate"
                />
            </div>
        </div>

    )
}
