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
 userName: '',
 userID: '',
 lastName: '',
 firstName: '',
 dateOfBirth: '',
 address: ''
}

const UserReducer = (state=initialState, action) => {
 switch(action.type){
  case UserActions.LOAD_USER:
   return Object.assign( {}, state, {
    userName: action.user.userName,
    userID: action.user.userID,
    lastName: action.user.lastName,
    firstName: action.user.firstName,
    dateOfBirth: action.user.dateOfBirth,
    address: action.user.address
   });
  case UserActions.UPDATE_USER:
  return Object.assign( {}, state, {
   userName: action.user.userName,
   userID: action.user.userID,
   lastName: action.user.lastName,
   firstName: action.user.firstName,
   dateOfBirth: action.user.dateOfBirth,
   address: action.user.address
  });
  default:
   return state;
 }
};

export default UserReducer;
