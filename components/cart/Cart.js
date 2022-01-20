import Image from "next/image";
import ToggleSwitch from "@/components/ToggleSwitch";
import Total from "@/components/cart/Total";
export default function Cart() {
  return (
    <div className="container mb-6 flex justify-between">
      <div className="">
        <p className="text-4xl font-bold text-gray-700 pt-10 pl-4 pb-8">Cart</p>
        <div className="bg-white flex  h-44 rounded-t-3xl  pt-4">
          <div className=" bg-white cursor-pointer rounded-[15px] object-fit -left-2 relative ml-10 mt-2 border border-gray-200 w-32 h-28 cursor-pointer">
            <Image
              src="/icons/products/product.png"
              layout="fill"
              alt="product logo"
            />
          </div>
          <div className="flex pl-1 pt-2 pr-6">
            <div>
              <p className="text-xl font-bold">2 DXB license plates</p>
              <p className="text-xl leading-3">Balnco Set</p>
              <p className="font-bold text-xl pt-3 text-blue-500">AED30.00</p>
              <div className="text-xs font-semibold pt-3 text-green-500">
                2 Coupons
                <span className="text-black font-normal"> per unit</span>
              </div>
            </div>
            <div className="flex ml-28 pt-9 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-16 mr-4 rounded-[15px] bg-gray-200"
                fill="none"
                viewBox="0 0 18 20"
                stroke="#808080"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 10H6"
                />
              </svg>{" "}
              <div className="pt-2 pl-6 h-12 w-16 text-xl rounded-[15px] text-[#808080] bg-gray-200 mr-4">
                1
              </div>
              <button className="mr-4 cursor-pointer text-blue-500 border border-gray-300 font-semibold h-12 w-28 rounded-[15px]">
                Add More
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#5dd74b] text-right  h-12  rounded-b-3xl">
          <p className="text-white text-sm mr-3 pt-1">
            Donate these product(s) to double the ticket(s)
            <ToggleSwitch sx={{ m: 1 }} defaultChecked />
          </p>
        </div>
      </div>
      <div className="flex mr-4">
        <Total />
      </div>
    </div>
  );
}
