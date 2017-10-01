/**
 * index
 * Entry point for the application
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, { Component } from "react";
import AppNav  from "./router";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import Session from './Reducer/Session';
import Map from './Reducer/Map';
import Event from './Reducer/Event';

const Reducer = combineReducers({
 Session, Map, Event
});

const store = createStore(Reducer, {});
if(module.hot){
 module.hot.accept('./Reducer', () => {
  const nextRootReducer = require('./Reducer/Session');
  store.replaceReducer(nextRootReducer);
 });
}

export default App = () => (
 <Provider store={store}>
  <AppNav token={store.getState().Session.token} />
 </Provider>
)
