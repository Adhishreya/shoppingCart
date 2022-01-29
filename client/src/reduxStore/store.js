import { Provider, applyMiddleware, connect } from "react-redux";
import { createStore } from "redux";
import thunk from 'redux-thunk';
import Products from "../components/DataFetch";
import Main from '../Main';
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const SEARCH_SET = "SEARCH_SET";
// const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
const initialState = {
  itemCount: 0,
  searchString: ''
  // ,items:[]
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let tempCount = state.itemCount + 1;
      return Object.assign({}, state, { itemCount: tempCount });
    }
    case REMOVE_FROM_CART: {
      let tempCount = state.itemCount - 1;
      if (tempCount < 0) {
        tempCount = 0;
      }
      return Object.assign({}, state, { itemCount: tempCount });
    }
    case SEARCH_SET :{
      return Object.assign({},state,{searchString:e});
    }
    default:
      return state;
  }
};
export const add = () => {
  return {
    type: ADD_TO_CART
  };
}
export const remove = () => {
  return {
    type: REMOVE_FROM_CART
  };
}
export const setSearchState = (e) => {
  return { type: SEARCH_SET }
}

export const store = createStore(cartReducer);

export const mapDispatchToProps = dispatch => {
  return {
    add: () => dispatch(add()),
    remove: () => dispatch(remove()),
    setSearchState :()=>dispatch(setSearchState(e))
  }
}

export const mapStateToProps = (store) => {
  return { itemCount: store.itemCount };
}

