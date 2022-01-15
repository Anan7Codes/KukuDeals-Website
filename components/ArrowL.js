import React from "react";

export default function ArrowL() {
  return (
    <div className="relative flex justify-end">
      <div className=" absolute text-white w-14 h-12 cursor-pointer border border-white rounded-[15px] text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-16 pt-3 pr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
}
