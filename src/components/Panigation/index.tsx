"use client";
import IconLeft from "@/assets/icons/IconLeft";
import IconRight from "@/assets/icons/IconRight";

const Pagination = ({ onPageChange }: any) => {
  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange("next")}
          className="flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border hover:bg-slate-100 cursor-pointer"
        >
          <IconLeft />
        </button>
        <button
          onClick={() => onPageChange("prev")}
          className="flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border hover:bg-slate-100 cursor-pointer"
        >
          <IconRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
