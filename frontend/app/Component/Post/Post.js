import React, {Component} from "react";
import {View, TextInput,Button,StyleSheet,Dimensions, Text} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CameraScene from './Camera.js';

const PicturePath = "";

class Post extends Component {
	state= {};
	render() {
          const { navigate } = this.props.navigation;   

	return (
	  <View style={styles.container}>
        <CameraScene />
        <View style={styles.container}>
  <TextInput
  placeholder = " What's on? "
        style={styles.title}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <TextInput
  placeholder = " Tell the world more details ... "
  multiline = {true}
        style={styles.input}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
      <Button 
      onPress = {() => navigate('Events')}
  title="Pin it"
  color="red"
  accessibilityLabel=""
/>
        </View> 
      </View>);

	};


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('window').height,
   width: Dimensions.get('window').width
 },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  input: {
    marginTop:20,
    marginBottom:20,
height: 100,
 width: 300,
 borderColor: 'gray',
  borderWidth: 1

  },
  title: {
    marginTop:20,
    marginBottom:0,
height: 40,
 width: 300,
 borderColor: 'gray',
  borderWidth: 1

  }
});


export default Post;