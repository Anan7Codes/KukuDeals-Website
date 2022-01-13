import Image from "next/image";
import Soldout1 from "./Soldout1";

export default function Soldout() {
  return (
    <div>
      <div className="">
        <div className="bg-[#f53435] h-[40rem]  rounded-[45px] px-6 py-5  text-white">
          <div className="p-4 ml-3">
            <div className="font-[1000] text-4xl">Sold Out</div>
            <div className="text-lg font-bold">
              All our sold out campaigns along with their <br /> corresponding
              draw dates are listed below
            </div>
          </div>
          <div className="p-4 flex justify-between">
            <Soldout1 />
            <Soldout1 />
            <Soldout1 />
            <Soldout1 />
          </div>
        </div>
      </div>
    </div>
  );
}
