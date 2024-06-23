//@ external lib import
import * as React from "react";

//@ MUI lib import
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";

//@ main component
const CustomTable = (props) => {
  /**
   * destructuring all props
   */
  const data = props["data"] || [];
  const columns = props["columns"] || [];
  const hideBtn = props["hideBtn"] || false;
  const addWithoutModal = props["addWithoutModal"] || false;
  const tableInfo = props["tableInfo"] || {};
  const addShowModal = props["addShowModal"];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /**
   * function to create data rows based on provided data and columns
   */
  function createData(data, columns) {
    const rowData = {};
    columns?.forEach((column) => {
      rowData[column?.id] = data[column?.id];
    });
    return rowData;
  }

  /**
   * mapping data to rows using createData function
   */
  const rows = data?.map((data) => createData(data, columns));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {!addWithoutModal && !hideBtn && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#343a40",
            color: "#fff",
            marginRight: 2,
            marginBottom: 2,
            paddingTop: 1,
            paddingBottom: 1,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#343a40",
            },
          }}
          startIcon={<AddCircleIcon />}
          onClick={addShowModal}
        >
          {`Add ${tableInfo?.addTitle}`}
        </Button>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: "#343a40", color: "#fff" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

export default CustomTable;
