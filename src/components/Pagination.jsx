import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }) => {
  if (totalPages <= 1) return null;

  return (
    <div className={`d-flex justify-content-center ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className="btn mx-1"
          style={
            currentPage === index + 1
              ? { backgroundColor: "#A42B3D", color: "white", borderColor: "#A42B3D" }
              : { backgroundColor: "transparent", color: "#A42B3D", borderColor: "#A42B3D" }
          }
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
