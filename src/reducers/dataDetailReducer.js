import { FETCH_DATA_DETAIL } from "../actions/types";

const dataDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DATA_DETAIL:
      return action.payload;
    default:
      return state;
  }
};

export default dataDetailReducer;
