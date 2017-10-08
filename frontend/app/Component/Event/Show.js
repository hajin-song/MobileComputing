import React,{Component} from 'react'
import { FlatList, View, Text} from 'react-native'
import { List, ListItem } from "react-native-elements";
import { connect } from 'react-redux';

import EventActions from '../../Action/Event';

const mapStateToProps = (state) => {
 return {
  curEvent: state.Event.curEvent
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({

 });
}

class Event extends Component{
	render(){
		return(
			<View>
				<Text>{this.props.curEvent.Name}</Text>
				<Text>{this.props.curEvent.Details}</Text>
			</View>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Event);
