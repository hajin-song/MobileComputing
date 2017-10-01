/**
 * Router.js
 * Navigation Routing for application
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import GuestNav from './Component/Nav/Guest';
import UserNav from './Component/Nav/User';

const mapStateToProps = (state) => {
 return {
  token: state.Session.token
 }
};

const AppNav = ({token}) => {
 if(token==""){
  return (
    <GuestNav />
  );
 }
 return <UserNav />
}

export default connect(mapStateToProps)(AppNav);
