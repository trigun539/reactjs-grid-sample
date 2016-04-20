import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware                           from 'redux-thunk';
import logger                                    from 'redux-logger';
import { appReducer }                            from './reducer';
import { fetchDBs }                              from './actions';

const theLogger = new logger();
const finalCreateStore = compose(
  // Store Middleware
  applyMiddleware(thunkMiddleware, theLogger)
)(createStore);

export const store = finalCreateStore(appReducer);

window.store = store;
