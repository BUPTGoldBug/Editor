'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import UserReducer from './reducers/UserReducer';
import GoldBugReducer from './reducers/GoldBugReducer';
import checkReducer from "./reducers/CheckReducer";
import NavigatorReducer from './reducers/NavigatorReducer';

import {navigator_midderware } from "./components/NavigationPage"

import ArReducer from './reducers/ArReducer';
import { persistStore,persistReducer } from 'redux-persist';

import {persistConfig} from './util/Constant'
const logger = createLogger();
const rootReducer = combineReducers({
    navigator: NavigatorReducer,
    user: UserReducer,
    goldBug:GoldBugReducer,
    ar:ArReducer,
    check:checkReducer,
})
const persistreducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistreducer,
    {},  //initialState
    applyMiddleware(thunk, promiseMiddleware(),navigator_midderware, logger) //传入所有的
);


export const persistor = persistStore(store);

export default store;