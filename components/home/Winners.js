import Winners1 from "@/components/home/WinnersCard";
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
        <Winners1 />
    </div>,
    <div className="item" data-value="1" key="1">
        <Winners1 />
    </div>,
    <div className="item" data-value="2" key="2">
        <Winners1 />
    </div>,
    <div className="item" data-value="3" key="3">
        <Winners1 />
    </div>,
    <div className="item" data-value="4" key="4">
        <Winners1 />
    </div>,
    <div className="item" data-value="5" key="5">
        <Winners1 />
    </div>,
    <div className="item" data-value="6" key="6">
        <Winners1 />
    </div>,
    <div className="item" data-value="7" key="7">
        <Winners1 />
    </div>,
];

export default function Winners() {
    const [index, setIndex] = useState(0);
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
            </div>
        </div>
    )
}
