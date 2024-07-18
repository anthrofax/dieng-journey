import React from "react";
import classes from "./pagination.module.css";
import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Review } from "@prisma/client";

const Pagination = ({
  setItemOffset,
  itemsPerPage,
  reviews,
}: {
  setItemOffset: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  reviews: Review[];
}) => {
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % reviews?.length;

    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      nextClassName={`${classes.item} ${classes.nextArrow}`}
      previousClassName={`${classes.item} ${classes.previousArrow}`}
      pageClassName={`${classes.item}`}
      activeClassName={`${classes.item} ${classes.active}`}
      breakClassName={`${classes.item}`}
      containerClassName={`${classes.pagination}`}
      breakLabel="..."
      previousLabel={<AiOutlineArrowLeft size={25} />}
      nextLabel={<AiOutlineArrowRight size={25} />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={reviews?.length / itemsPerPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
