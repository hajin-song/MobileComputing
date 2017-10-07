/**
 * Session.js
 * Session Reducer
 * Created On: 07-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 07-Oct-2017
 * Last Modified By: 07-Oct-2017
 */

import UserActions from '../Action/User';

const initialState = {
 user: {
  userName: '',
  userID: '',
  lastName: '',
  firstName: '',
  dateOfBirth: '',
  address: '',
  Subscriptions: 0
 },
 subscriptions: []
}

const UserReducer = (state=initialState, action) => {
 switch(action.type){
  case UserActions.LOAD_USER:
   return Object.assign( {}, state, { user: action.user });
  case UserActions.UPDATE_USER:
   return Object.assign( {}, state, { user: action.user });
  default:
   return state;
 }
};

export default UserReducer;
