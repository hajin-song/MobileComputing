/**
 * Session.js
 * Session Reducer
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: 29-Sept-2017
 */

import SessionActions from '../Action/Session';

const initialState = {
 token: ''
}

const SessionReducer = (state=initialState, action) => {
 switch(action.type){
  case SessionActions.SET_AUTH_TOKEN:
   return Object.assign( {}, state, { token: action.token });
  default:
   return state;
 }
};

export default SessionReducer;
