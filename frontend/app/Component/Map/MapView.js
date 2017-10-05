/**
 * MapView.js
 * Map View
 * Created On: 01-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, {Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Style from './Style';

import { NavButton } from '../Common/Button';

import MapActions from '../../Action/Map';

const accessToken = 'pk.eyJ1IjoibXNrazBubm5ubiIsImEiOiJjajRjcHhyOGIwY3QzMzNydHF3MjZwZHNlIn0.-lD6Qmj7oExfr4XdU2kiYQ';
Mapbox.setAccessToken(accessToken);

const mapStateToProps = (state) => {
 return {

 }
};

const mapDispatchToProps = (dispatch) => {
 return ({
  setCoordinates: (longitude, latitude) => {
   dispatch({ 'type': MapActions.UPDATE_COORDINATE, 'coordinate': {longitude, latitude }});
  }
 });
}

class Map extends Component {
 constructor(props){
  super(props);
  this.state = {
   center: { latitude: 40.7205624, longitude: -73.976823},
   zoom: 11,
   userTrackingMode: Mapbox.userTrackingMode.none
  }
  this.__updateCoordinate = this.__updateCoordinate.bind(this);
 }
 __updateCoordinate(geoResult){
  let longitude = geoResult.coords.longitude;
  let latitude = geoResult.coords.latitude;
  this.props.setCoordinates(longitude, latitude);
  this.state.center = { longitude, latitude }
  this._map.setCenterCoordinateZoomLevel(latitude, longitude, this.state.zoom);
 }
 componentWillMount() {
  navigator.geolocation.getCurrentPosition( (pos) => {
   console.log(pos);
   this.__updateCoordinate(pos);
  }, (err) => {
   console.log(err);
  });
  this.watchID = navigator.geolocation.watchPosition( (pos) => {
   this.__updateCoordinate(pos);
  });
 }
 componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID);
 }
 render(){
  return(
   <View style={Style.container}>
    <MapView
     style={Style.map}
     ref={map => {this._map = map; }}
     initialCenterCoordinate={this.state.center}
     initialZoomLevel={this.state.zoom}
     initialDirection={0}
     rotateEnabled={true}
     scrollEnabled={true}
     zoomEnabled={true}
     showsUserLocation={false}
     styleURL={Mapbox.mapStyles.dark}
     userTrackingMode={this.state.userTrackingMode}
    />
   </View>
  );
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
