import ClosingSoon from "@/components/ClosingSoon";

export default function Section1() {
  return (
    <>
      <div className="text-[25px] text-gray-800 pt-5  pb-3 font-extrabold ">
        Closing Soon
      </div>
      <div className=" container mx-auto py-1  rounded-[15px]">
        <div className="flex justify-between ">
          <ClosingSoon />
          <ClosingSoon />
          <ClosingSoon />
          <ClosingSoon />
          <ClosingSoon />
        </div>
      </div>
    </>
  );
}
