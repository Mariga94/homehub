import { useEffect, useState } from "react";
import "./Pagination.css";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  // Generate an array of page numbers based on total pages
  const pageNumbers: number[] = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  useEffect(() => {
    // Ensure the current page stays within valid bounds
    if (currentPage < 1) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={currentPage === pageNumber ? "active" : ""}
          >
            <button onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
