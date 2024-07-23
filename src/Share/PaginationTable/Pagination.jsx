import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Pagination = ({ setRowPerPage, setPage, page, stat }) => {
  const [perPage, setPerPage] = useState(10);

  console.log(perPage);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTotalPages(stat?.totalPages);
  }, [stat]);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const changePerPage = (value) => {
    setRowPerPage(value);
    setPage(1); // Reset to the first page when changing items per page
  };

  const goToPage = (selectedPage) => {
    setPage(selectedPage);
  };

  const goToPreviousPageSet = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPageSet = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePageCount = 5;

    if (totalPages <= visiblePageCount) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage !== 1) {
        pageNumbers.push(1);
      }

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      const maxButtons = Math.min(visiblePageCount - 2, totalPages - 2);
      let startPage;
      if (currentPage + maxButtons <= totalPages) {
        startPage = Math.max(
          currentPage,
          Math.min(totalPages - maxButtons, currentPage - 2)
        );
      } else {
        startPage = totalPages - maxButtons;
      }
      for (let i = 0; i < maxButtons; i++) {
        pageNumbers.push(startPage + i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      if (currentPage !== totalPages) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col lg:flex-col 2xl:flex-row items-center  justify-between py-2">
      <div className="flex items-center space-x-4">
        <button
          className="py-2 px-2 border-2 rounded-md bg-slate-300  hover:bg-gray-400 text-[#305edd]"
          onClick={goToPreviousPageSet}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>

        <ul className="flex space-x-4">
          {renderPageNumbers().map((number, index) => (
            <li key={index}>
              {number === "..." ? (
                <span className="py-2 px-2 cursor-not-allowed">{number}</span>
              ) : (
                <a
                  href="#"
                  className={`py-1 px-3 border-2 rounded-md ${
                    number === 1 || number === totalPages
                      ? "bg-slate-200  text-gray-800"
                      : currentPage === number
                      ? "bg-[#305edd] text-white"
                      : "bg-white text-gray-700"
                  } hover:bg-slate-300  hover:text-gray-800`}
                  onClick={() => typeof number === "number" && goToPage(number)}
                >
                  {number}
                </a>
              )}
            </li>
          ))}
        </ul>

        <button
          className="py-2 px-2 border-2 rounded-md  bg-slate-300  hover:bg-gray-400 text-[#305edd]"
          onClick={goToNextPageSet}
          disabled={currentPage === totalPages}
        >
          <FaArrowRight />
        </button>
      </div>

      <div className="flex justify-center  gap-4 items-center mt-4">
        <div className="flex gap-2 flex-row lg:flex-row  items-center justify-center">
          <h1 className="text-sm">Current Page: {stat?.currentPage}</h1>
          <h1 className="text-sm">Total Page: {totalPages}</h1>
          <h1 className="text-sm">Current Item: {stat?.itemCount}</h1>
          <h1 className="text-sm">Total Item: {stat?.totalItems}</h1>
        </div>

        <div>
          <select
            className="p-2 border border-gray-300 rounded-md"
            onChange={(e) => changePerPage(e.target.value)}
            defaultValue={perPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
