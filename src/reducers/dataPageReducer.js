import { DATA_PAGE } from "../actions/types";

const dataPageReducer = (state = 1, action) => {
  // default: page 1
  switch (action.type) {
    case DATA_PAGE:
      let page = action.payload;
      if (page.charCodeAt() === 187) {
        // >>
        page = state + 1;
      } else if (page.charCodeAt() === 171) {
        // <<
        page = state - 1;
      } else {
        page = parseInt(page);
      }
      return page;
    default:
      return state;
  }
};

export default dataPageReducer;
