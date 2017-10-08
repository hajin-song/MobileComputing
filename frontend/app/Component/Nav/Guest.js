/**
 * Guest.js
 * Navigation Routing for application for Guest Users
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from "react";

import { TabNavigator } from "react-navigation";

import Login from '../Auth/SignIn';
import Register from '../Auth/Register';
import Main from '../Map/MapView';

import { NavStyle } from './Style';

export default Guest = TabNavigator(
 {
  'Map': { screen: Main },
  'Sign In': { screen: Login },
  'Register': { screen: Register },
 },
 NavStyle
);
