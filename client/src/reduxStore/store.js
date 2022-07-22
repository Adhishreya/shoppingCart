import { Provider, applyMiddleware, connect } from "react-redux";
import { createStore } from "redux";
import thunk from 'redux-thunk';
import Products from "../components/DataFetch";
import Main from '../Main';

import { localItems } from '../requestModules/products'
// console.log(localItems());
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_TO_CART = "ADD_TO_CART";
const SEARCH_SET = "SEARCH_SET";
const QUANTITY_SET = "QUANTITY_SET";
const IS_LOGGED = "IS_LOGGED";
const SEARCH_STRING = "SEARCH_STRING";
const SAVE_USER = "SAVE_USER";
// const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";
const initialState = {
  itemCount: localItems(),
  searchString: null,
  isLogged: false,
  openHandle: null,
  user:null
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
    case QUANTITY_SET: {
      return Object.assign({}, state, { itemCount: action.payload });
    }
    case IS_LOGGED: {
      return Object.assign({}, state, { isLogged: !state.isLogged });
    }
    case SEARCH_STRING: {
      console.log("this is the redux store " + action.payload)
      return Object.assign({}, { searchString: action.payload })
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
export const setSearchState = (searchParam) => {
  return { type: SEARCH_STRING, payload: searchParam }
}
export const setQuantity = (quant) => {
  return { type: QUANTITY_SET, payload: quant };
}

export const saveUser = (user) =>{
  return {type :SAVE_USER , payload : user};
}

export const store = createStore(cartReducer);

export const mapDispatchToProps = dispatch => {
  return {
    add: () => dispatch(add()),
    remove: () => dispatch(remove()),
    setSearchState: (searchParam) => dispatch(setSearchState(searchParam)),
    setQuantity: (quant) => dispatch(setQuantity(quant)),
    saveUser : (user) => dispatch(saveUser(user))
  }
}

export const mapStateToProps = (store) => {
  return { itemCount: store.itemCount, searchString:store.searchString};
}

