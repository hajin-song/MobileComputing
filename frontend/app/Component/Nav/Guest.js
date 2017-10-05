/**
 * Guest.js
 * Navigation Routing for application for Guest Users
 */

import React from "react";

import { TabNavigator } from "react-navigation";

import Login from '../Auth/SignIn.js';
import Register from '../Auth/Register';
import Main from '../Map/MapView.js';

import { NavStyle } from './Style';

export default Guest = TabNavigator(
 {
  'Map': { screen: Main },
  'Sign In': { screen: Login },
  'Register': { screen: Register },
 },
 NavStyle
);
