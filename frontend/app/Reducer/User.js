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
 },
 subscriptions: []
}

const UserReducer = (state=initialState, action) => {
 switch(action.type){
  case UserActions.LOAD_USER:
   return Object.assign( {}, state, { user: action.user, subscriptions: action.subscriptions });
  case UserActions.UPDATE_USER:
   return Object.assign( {}, state, { user: action.user, subscriptions: action.subscriptions });
  case UserActions.ADD_SUBSCRIPTION:
   return Object.assign( {}, state, {subscriptions: [...state.subscriptions, action.subscription] });
  case UserActions.REMOVE_SUBSCRIPTION:
   var removed = state.subscriptions.filter( (sub) => {
    return !(sub.UserName == action.subscription.UserName && sub.targetUserName == action.subscription.targetUserName);
   });
   return Object.assign( {}, state, {subscriptions: removed });
  default:
   return state;
 }
};

export default UserReducer;
