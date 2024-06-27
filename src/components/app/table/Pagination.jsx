import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TablePagination } from "@mui/material";
import { defaultConfig } from "antd/es/theme/context";
import debounce from "../../..//helpers/debounce";
import {
  handleChangePage,
  handlePageSize,
  handlePagination,
} from "../../../redux/features/paginationReducer";

const Pagination = ({ paginationInfo }) => {
  const dispatch = useDispatch();

  const {
    totalPage,
    page: pageCount,
    limit: limitCount,
  } = useSelector((state) => state.pagination);

  const [page, setPage] = React.useState(pageCount);
  const [limit, setLimit] = React.useState(limitCount);

  const delayedPageSize = React.useCallback(
    debounce((pageSize) => {
      dispatch(handlePageSize(Number(pageSize)));
    }, defaultConfig.delay),
    []
  );

  const delayedPageChange = React.useCallback(
    debounce((page) => {
      dispatch(handleChangePage(Number(page)));
    }, defaultConfig.delay),
    []
  );
  const handleChangeNewPage = (event, newPage) => {
    setPage(Number(newPage) + 1);
    delayedPageChange(Number(newPage) + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    setLimit(+event.target.value);
    delayedPageSize(+event.target.value);
    delayedPageChange(1);
  };

  useEffect(() => {
    if (paginationInfo && Object.keys(paginationInfo).length > 0) {
      dispatch(handlePagination(paginationInfo));
    }
  }, [paginationInfo]);

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={totalPage * limit}
      rowsPerPage={limit}
      page={page - 1}
      onPageChange={handleChangeNewPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
