/**
 * Map.js
 * Map Reducer
 * Created On: 01-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import MapActions from '../Action/Map';

const initialState = {
 coordinate: { longitude: 0, latitude: 0 }
}

const MapReducer = (state=initialState, action) => {
 switch(action.type){
  case MapActions.UPDATE_COORDINATE:
   console.log(action);
   return Object.assign( {}, state, { coordinate: action.coordinate });
  default:
   return state;
 }
};

export default MapReducer;
