import Image from "next/image";

export default function ClosingSoon() {
  return (
    <div className="w-[11.5rem] h-[16.5rem] bg-white rounded-[15px] overflow-hidden  shadow-lg transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-105  duration-1000 ">
      <div className="pt-4 mx-auto text-center text-xs tracking-tight	">654 Sold out of 725</div>
      <div className="relative px-4">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-[25px] bg-gray-200">
          <div
            style={{ width: "30%" }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-500"
          ></div>
        </div>
      </div>
      <div className=" py-3 px-3 flex items-center w-full h-24 relative cursor-pointer">
        <Image
          src="/icons/products/product.png"
          layout="fill"
          alt="product logo"
        />
      </div>
      <div className="px-4 pt-3 text-center tracking-tight leading-3 ">
        <p className=" text-sm tracking-tighter	 ">
          Get a chance to
          <span className="text-red-500 font-bold italic"> Win</span>
        </p>
        <p className="text-gray-700 text-sm font-bold tracking-tighter 	">AED 25,000 Cash</p>
      </div>
      <div className="text-center tracking-tighter pt-2	">
        <button className="w-28 h-7  border border-gray-500 rounded-[20px]  text-xs font-bold hover:bg-blue-500 hover:text-white hover:font-bold hover:border-none text-gray-600 tracking-tight	">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
