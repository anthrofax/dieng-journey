import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-4 py-2 rounded ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};
