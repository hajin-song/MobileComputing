/**
 * Post.js
 * Post Reducer
 * Created On: 01-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: 01-Oct-2017
 */

import EventsAction from '../Action/Event';

const initialState = {
 events: []
}

const EventReducer = (state=initialState, action) => {
 switch(action.type){
  case EventsAction.CREATE_EVENT:
   console.log(action);
   return state;
  case EventsAction.LOAD_EVENTS:
   return Object.assign({}, state, { events: action.events });
  default:
   return state;
 }
};

export default EventReducer;
