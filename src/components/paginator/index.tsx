import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  nPages,
  currentPage,
  setCurrentPage,
  totalRecords,
  recordsPerPage,
}: any) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const renderLegend = () => {
    if (totalRecords > 0) {
      return (
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-gray-500 text-sm">
              Showing {currentPage * recordsPerPage - recordsPerPage + 1} to{" "}
              {currentPage * recordsPerPage > totalRecords
                ? totalRecords
                : currentPage * recordsPerPage}{" "}
              of {totalRecords} entries
            </span>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={prevPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={nextPage}
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {renderLegend()}

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <ul className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <li>
                <a
                  href="#"
                  onClick={prevPage}
                  className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
              {pageNumbers.map((pgNumber: any) => (
                <li key={pgNumber}>
                  <a
                    onClick={() => setCurrentPage(pgNumber)}
                    aria-current="page"
                    className={`page-item ${
                      currentPage == pgNumber
                        ? "relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-200"
                        : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    } `}
                    href="#"
                  >
                    {pgNumber}
                  </a>
                </li>
              ))}

              <li>
                <a
                  href="#"
                  onClick={nextPage}
                  className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
