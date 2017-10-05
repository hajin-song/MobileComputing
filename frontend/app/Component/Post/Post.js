/**
 * Post.js
 * Post View
 * Created On: 01-Oct-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: Ha Jin Song
 */

import React, {Component} from "react";
import {View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';

import Style from './Style';

import CameraScene from './Camera.js';
import { ActionButton } from '../Common/Button';
import EventActions from '../../Action/Event';

const PicturePath = "";

const mapStateToProps = (state) => {
 return {
  token: state.Session.token,
  coordinate: state.Map.coordinate
 }
};

const mapDispatchToProps = (dispatch) => {
 return ({

 });
}

class Post extends Component {
	constructor(props){
		super(props);
		this.state = { title: '', content: '' }
		this.__post = this.__post.bind(this);
	}
	__post(token, coordinate){
		console.log(this.state, token, coordinate);
	}
	render() {
		return (
		  <View style={Style.container}>
					<CameraScene />
					<View style={Style.container}>
			  <TextInput
						placeholder = "What's on?"
						style={Style.title}
						onChangeText={ (title) => this.setState({title}) }
						value={this.state.title}
					/>
	    <TextInput
						placeholder = "Tell the world more details..."
						multiline = {true}
	     style={Style.input}
	     onChangeText={ (content) => this.setState({content})}
	     value={this.state.text}
	    />
					<ActionButton title="Pin it" onPress = {() => this.__post(this.props.token, this.props.coordinate)} />
				</View>
			</View>
		);
	}

storePicture(){
      console.log( PicturePath );
      if (PicturePath) {
        // Create the form data object
        var data = new FormData();
        data.append('picture', {uri: PicturePath, name: 'selfie.jpg', type: 'image/jpg'});

        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
           'Authorization': 'Bearer ' + 'SECRET_OAUTH2_TOKEN_IF_AUTH',
         },
         body: data,
        }

        fetch("https://Postman-echo.com/Post", config)
         .then((responseData) => {
             // Log the response form the server
             // Here we get what we sent to Postman back
             console.log(responseData);
         })
         .catch(err => {
           console.log(err);
         })
    }
  }

  takePicture() {
   this.camera.capture()
     .then((data) => {
         console.log(data);
         PicturePath = data.path;
     })
     .catch(err => console.error(err));
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Post);
