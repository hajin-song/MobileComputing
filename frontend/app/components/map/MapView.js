import React, {Component } from 'react';
import {Image} from 'react-native';

export default class Map extends Component {

  render() 
  {
    return(<Image source = {require('./map.png')}/>);
  }
}