'use strict';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import UserReducer from './reducers/UserReducer';
import GoldBugReducer from './reducers/GoldBugReducer';
import NavigatorReducer from './reducers/NavigatorReducer';
import {navigator_midderware } from "./components/NavigationPage"


const logger = createLogger();

const store = createStore(
    combineReducers({
        navigator: NavigatorReducer,
        user: UserReducer,
        goldBug:GoldBugReducer,
    }),
    {},  //initialState
    applyMiddleware(thunk, promiseMiddleware(),navigator_midderware, logger) //传入所有的
);

export default store;