//@ external lib import
import * as React from "react";

//@ MUI lib import
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Box } from "@mui/material";

//@ component import
import NoData from "../../common/NodataPage";
import Pagination from "./Pagination";

//@ main component
const CustomTable = (props) => {
  /**
   *   all props declare
   */
  const data = props["data"] || [];
  const columns = props["columns"] || [];
  const hideBtn = props["hideBtn"] || false;
  const addWithoutModal = props["addWithoutModal"] || false;
  const tableInfo = props["tableInfo"] || {};
  const addShowModal = props["addShowModal"];
  const paginationInfo = props["paginationInfo"] || {};

  /**
   *  data transform for table
   */
  function createData(data, columns) {
    const rowData = { _id: data?._id };
    columns?.forEach((column) => {
      if (column?.id !== "action") {
        rowData[column?.id] = data[column?.id];
      }
    });
    return rowData;
  }
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

      <TableContainer sx={{ maxHeight: 403 }}>
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="50vh"
                  >
                    <NoData />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.renderCell
                          ? column.renderCell({ value, row })
                          : column.format
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/**
       * pagination
       */}
      {paginationInfo && <Pagination paginationInfo={paginationInfo} />}
    </Paper>
  );
};

export default CustomTable;
