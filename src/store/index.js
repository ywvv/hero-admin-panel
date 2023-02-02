import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, stringMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
