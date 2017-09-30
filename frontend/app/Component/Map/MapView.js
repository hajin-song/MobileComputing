import React, {Component } from 'react';
import Mapbox, { MapView } from 'react-native-mapbox-gl';
import { NavButton } from '../Common/Button';

import { View, Image} from 'react-native';

const accessToken = 'pk.eyJ1IjoibXNrazBubm5ubiIsImEiOiJjajRjcHhyOGIwY3QzMzNydHF3MjZwZHNlIn0.-lD6Qmj7oExfr4XdU2kiYQ';
Mapbox.setAccessToken(accessToken);

export default class Map extends Component {
 constructor(props){
  super(props);
  this.state = {
   center: { latitude: 40.7205624, longitude: -73.976823},
   zoom: 11,
   userTrackingMode: Mapbox.userTrackingMode.none
  }
 }
  render()
  {
    return(
     <View style={{flex: 1, alignItems: 'stretch'}}>
      <MapView
       style={{flex:1}}
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
      <NavButton title="Sign In" onPress={ () => this.props.navigation.navigate("Login") } />
      <NavButton title="Register" onPress={ () => this.props.navigation.navigate("Register") } />
     </View>
    );
  }
}
