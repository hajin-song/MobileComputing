/**
 * index
 * Entry point for the application
 */

import React, { Component } from "react";
import AppNav  from "./router";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import Session from './Reducer/Session';

const Reducer = combineReducers({
 Session
});

const store = createStore(Reducer, {});
if(module.hot){
 module.hot.accept('./Reducer', () => {
  const nextRootReducer = require('./Reducer/Session');
  store.replaceReducer(nextRootReducer);
 });
}

export default class App extends Component {
 render() {
  console.log(store.getState());
  return (
   <Provider store={store}>
    <AppNav token={store.getState().Session.token} />
   </Provider>
  );
 }
}
