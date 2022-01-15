import Soldout1 from "./Soldout1";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowL from "./ArrowL";
import ArrowR from "./ArrowR";

const responsive = {
  0: { items: 1 },
  1024: { items: 4 },
  1736: { items: 5 }
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
  return (
    <div>
      <div className="">
        <div className="bg-[#f53435] h-[35rem] rounded-[45px] px-6 py-5 text-white">
          <div className="p-4 ml-3 relative">
            <div className="flex justify-between">
              <p className="font-[1000] text-4xl">Sold Out</p>
            </div>
            <div className="flex justify-between"></div>
            <div className="text-lg font-bold">
              All our sold out campaigns along with their <br /> corresponding
              draw dates are listed below
            </div>
            <div className="mt-8">
              <AliceCarousel
                mouseTracking
                items={items}
                responsive={responsive}
                renderPrevButton={( )=>{return (<div className="absolute -top-24 right-24"><ArrowL/></div>)}}
                renderNextButton={( )=>{return (<div className="absolute -top-24 right-20"><ArrowR/></div>)}}
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
