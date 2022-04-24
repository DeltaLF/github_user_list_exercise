import { FETCH_DATA, FETCH_DATA_DETAIL, DATA_PAGE } from "./types";

export const fetchData = () => async (dispatch, getState) => {
  const usersData = await fetch("https://api.github.com/users?per_page=100");
  // 100 users
  const result = await usersData.json();
  dispatch({ type: FETCH_DATA, payload: result });
};

export const fetchDataDetail = (userName) => async (dispatch, getState) => {
  const todos = await fetch(` https://api.github.com/users/${userName}`);
  let result = await todos.json();

  dispatch({ type: FETCH_DATA_DETAIL, payload: result });
};

export const setDataPage = (page) => {
  return { type: DATA_PAGE, payload: page };
};
