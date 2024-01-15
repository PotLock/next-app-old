"use client";
import IconLeft from "@/assets/icons/IconLeft";
import IconRight from "@/assets/icons/IconRight";
import { useEffect, useState } from "react";

const Pagination = ({ data, itemsPerPage, onPageChange }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border hover:bg-slate-100 cursor-pointer"
        >
          <IconLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-[44px] h-[44px] p-[10px] rounded-full border hover:bg-slate-100 cursor-pointer"
        >
          <IconRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
