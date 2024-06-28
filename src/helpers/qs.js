// Importing store as named import
import { useSelector } from "react-redux";
import { store } from "../redux/store";

export const getURL = (route) => {
  // const { page, limit } = store.getState().pagination;

  const { page, limit } = useSelector((state) => state.pagination);

  let URL = `${route}`;
  if (page) URL += `?page=${page}`;
  if (limit) URL += `&limit=${limit}`;

  return URL;
};
