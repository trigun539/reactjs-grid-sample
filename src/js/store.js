import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import { appReducer }                            from './reducer';

const finalCreateStore = compose(
  // Store Middleware
  applyMiddleware(thunkMiddleware)
)(createStore);

export const store = finalCreateStore(appReducer);
