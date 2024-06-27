//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

//Internal Lib Import
import defaultConfig from "../../config/defaults";

const paginationReducer = createSlice({
  name: "paginationReducer",
  initialState: { ...defaultConfig },
  reducers: {
    handleChangePage(state, action) {
      state.page = action.payload;
    },
    handlePageSize(state, action) {
      console.log(action.payload);
      state.limit = action.payload;
    },
    handleSearchTerm(state, action) {
      state.search = action.payload;
    },
    handlePagination(state, action) {
      state.allDataCount = action.payload.allDataCount;
      state.limit = action.payload.limit;
      state.page = action.payload.page;
      state.totalPage = action.payload.totalPage;
    },
  },
});

export const {
  handleChangePage,
  handlePageSize,
  handleSearchTerm,
  handlePagination,
} = paginationReducer.actions;

export default paginationReducer.reducer;
