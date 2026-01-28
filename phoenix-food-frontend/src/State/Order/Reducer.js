import * as actionTypes from "./ActionTypes";

const initialState = {
  loading: false,
  orders: [],
  lastCreatedOrder: null, // store the most recent created order
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE ORDER
    case actionTypes.CREATE_ORDER_REQUEST:
    case actionTypes.GET_USERS_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        lastCreatedOrder: action.payload,
        orders: [...state.orders, action.payload],
      };

    case actionTypes.GET_USERS_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload, error: null };

    // FAILURES
    case actionTypes.CREATE_ORDER_FAILURE:
    case actionTypes.GET_USERS_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
