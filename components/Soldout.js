import Soldout1 from "./Soldout1";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "./ArrowL";
import ArrowR from "./ArrowR";

const responsive = {
  0: { items: 1 },
  1024: { items: 4 },
};
const items = [
  <div className="item" id="0" id="0" data-value="0">
    <Soldout1 />
  </div>,
  <div className="item" id="1"  data-value="1">
    <Soldout1 />
  </div>,
  <div className="item" id="2"  data-value="2">
    <Soldout1 />
  </div>,
  <div className="item" id="3"  data-value="3">
    <Soldout1 />
  </div>,
  <div className="item" id="4"  data-value="4">
    <Soldout1 />
  </div>,
  <div className="item" id="5"  data-value="5">
    <Soldout1 />
  </div>,
  <div className="item" id="6"  data-value="6">
    <Soldout1 />
  </div>,
  <div className="item" id="7"  data-value="7">
    <Soldout1 />
  </div>,
];

export default function Soldout() {
  return (
    <div>
      <div className="">
        <div className="bg-[#f53435] h-[35rem]  rounded-[45px] px-6 py-5  text-white">
          <div className="p-4 ml-3">
            <div className="flex justify-between">
              <p className="font-[1000] text-4xl">Sold Out</p>
            </div>
            <div className="flex justify-between"></div>
            <div className="text-lg font-bold">
              All our sold out campaigns along with their <br /> corresponding
              draw dates are listed below
            </div>
            <div className="">
              <AliceCarousel 
              key={items.id}
                mouseTracking
                items={items}
                responsive={responsive}
                renderPrevButton={( )=>{return <ArrowL/>}}
                renderNextButton={( )=>{return <ArrowR/>}}
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
