import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import contactsReducer from './reducers/contacts.reducer';

// Add thunk middlewre (can write action creators that return a function instead of an action)
const middlewares = [thunk];

// Add logger middlewre
const logger = createLogger({
  duration: true,
  collapsed: true },
);
middlewares.push(logger);

// Create generic store with our middlewares
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

// Create my store with custom reducer

/* eslint-disable */
export const MainStore = createStoreWithMiddleware(
  combineReducers({
    contactsReducer,
  }),
);
/* eslint-enable */
