import Soldout1 from "./SoldoutCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "@/components/home/ArrowL";
import ArrowR from "@/components/home//ArrowR";
import { useState } from "react";

const responsive = {
  0: { items: 1 },
  1024: { items: 4 },
  1736: { items: 5 },
};
const items = [
  <div className="item" data-value="0" key="0">
    <Soldout1 />
  </div>,
  <div className="item" data-value="1" key="1">
    <Soldout1 />
  </div>,
  <div className="item" data-value="2" key="2">
    <Soldout1 />
  </div>,
  <div className="item" data-value="3" key="3">
    <Soldout1 />
  </div>,
  <div className="item" data-value="4" key="4">
    <Soldout1 />
  </div>,
  <div className="item" data-value="5" key="5">
    <Soldout1 />
  </div>,
  <div className="item" data-value="6" key="6">
    <Soldout1 />
  </div>,
  <div className="item" data-value="7" key="7">
    <Soldout1 />
  </div>,
];

export default function Soldout() {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="">
        <div className="bg-[#f53435] h-[35rem] rounded-[45px] px-6 py-5 text-white">
          <div className="pt-2 ml-3 relative">
            <div className="flex justify-between">
              <p className="font-[700]  tracking-tighter text-3xl">Sold Out</p>
            </div>
            <div className="flex justify-between"></div>
            <div className="text-normal leading-5 font-semibold">
              All our sold out campaigns along with their <br /> corresponding
              draw dates are listed below
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
    </div>
  );
}
