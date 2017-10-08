/**
 * Index.js
 * View for Event Index - Main
 * Created On: 08-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 08-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React from 'react'
import { FlatList } from 'react-native'
import { List } from "react-native-elements";
import { connect } from 'react-redux';
import styles from './../../Style/Standard.js'

import EventList from './Index/List';

import EventActions from '../../Action/Event';

const mapStateToProps = (state) => {
 return {
  events: state.Event.events
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({
  selectEvent: (event) => {
   dispatch({'type': EventActions.SELECT_EVENT, 'curEvent': event});
  }
 });
}

const Event = ({ events, navigation, selectEvent }) => {
 return(
  <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
   <FlatList
    data={events}
    renderItem={({ item }) => <EventList item={item} navigation={navigation} onPress={selectEvent} />}
    keyExtractor={item => item.EventID}
    onEndReachedThreshold={50}
   />
  </List>
 );
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
