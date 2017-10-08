/**
 * MapView.js
 * Map View
 * Created On: 01-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, {Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { jsonToURLForm } from '../../Tool/DataFormat';

import Style from './Style';

import { NavButton } from '../Common/Button';

import MapActions from '../../Action/Map';
import EventActions from '../../Action/Event';

const accessToken = 'pk.eyJ1IjoibXNrazBubm5ubiIsImEiOiJjajRjcHhyOGIwY3QzMzNydHF3MjZwZHNlIn0.-lD6Qmj7oExfr4XdU2kiYQ';
Mapbox.setAccessToken(accessToken);

const mapStateToProps = (state) => {
 return {
  token: state.Session.token
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({
  setCoordinates: (longitude, latitude) => {
   dispatch({ 'type': MapActions.UPDATE_COORDINATE, 'coordinate': {longitude, latitude }});
  },
  loadEvents: (events) => {
   dispatch({ 'type': EventActions.LOAD_EVENTS, 'events': events });
  }
 });
}

class Map extends Component {
 constructor(props){
  super(props);
  this.state = {
   zoom: 11,
   userTrackingMode: Mapbox.userTrackingMode.none,
   annotations: []
  }
  this.__updateCoordinate = this.__updateCoordinate.bind(this);
  this.__getEvents = this.__getEvents.bind(this);
 }

 /**
  * __getEvents : void
  * Get Events using device's current longitude, latitude
  * Update the annotation object being used by the MapView
  */
 __getEvents(){
  let formBody = jsonToURLForm( { longitude: this.state.center.longitude, latitude: this.state.center.latitude } );
  fetch('http://eventchat.azurewebsites.net/api/Events/index?'+ formBody,{
   'method': 'GET',
   headers: {
    'Accept': 'application/json',
    'Authorization': this.props.token
   }
  }).then( (res) => {
   return res.json();
  }).then( (res) => {
   if(typeof(res.error) !== 'undefined'){
    this.props.screenProps.onMessage('error', 'Failed to retrieve Event List!');
    return;
   }
   this.props.loadEvents(res);
   this.setState({
    annotations: res.map( (evt) => {
     return {
      coordinates:[evt.Latitude, evt.Longitude],
      type: 'point',
      title: evt.Name,
      subtitle: evt.Detail,
      id: evt.EventID.toString()
     }
    })
   });
  }).catch( (err) => {
   console.log(err);
   this.props.screenProps.onMessage('error', 'Failed to retrieve Event List!');
  })
 }

 /**
  * __updateCoordinate : void
  * Update the Map, including the annotation (markers) displayed
  * @param  {Object} geoResult Result of GeoService
  */
 __updateCoordinate(geoResult){
  let longitude = geoResult.coords.longitude;
  let latitude = geoResult.coords.latitude;
  this.props.setCoordinates(longitude, latitude);
  this.state.center = { longitude, latitude }
  this._map.setCenterCoordinateZoomLevel(latitude, longitude, this.state.zoom, false);
  this.__getEvents();
 }
 componentWillMount() {
  // Add listener for geolocation service
  navigator.geolocation.getCurrentPosition( (pos) => {
   this.__updateCoordinate(pos);
  }, (err) => {
   console.log(err);
  });
  this.watchID = navigator.geolocation.watchPosition( (pos) => {
   this.__updateCoordinate(pos);
  });
 }
 componentWillUnmount(){
  // Remove listener for geoLocation service
  navigator.geolocation.clearWatch(this.watchID);
 }
 render(){
  return(
   <View style={Style.container}>
    <MapView
     style={Style.map}
     ref={map => {this._map = map; }}
     annotations={this.state.annotations}
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
