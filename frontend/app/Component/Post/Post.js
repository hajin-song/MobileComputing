/**
* Post.js
* Post View
* Created On: 01-Oct-2017
* Created By: Ha Jin Song
* Last Modified On: 07-Oct-2017
* Last Modified By: Najla
*/

import React, {Component} from "react";
import {View, TextInput ,Text ,  Image, StyleSheet,Dimensions,TouchableHighlight} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Style from './Style';
import { ActionButton } from '../Common/Button';
import EventActions from '../../Action/Event';
import Camera from 'react-native-camera';
import RNFS from 'react-native-fs'
import styles from './../../Style/Standard.js'
import { jsonToURLForm } from '../../Tool/DataFormat';


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
    this.state = { title: '', content: '', base64:null}
    this.__post = this.__post.bind(this);

  }


  __post(token, coordinate){
    RNFS.readFile(this.state.path.substring(7), "base64").then((res) => this.setState(base64format: res,coordinate: coordinate, token: token, title:'userid_image.jpg', type: 'image/jpg'))
    let formBody = jsonToURLForm(Object.assign({}, this.state));
    fetch('http://eventchat.azurewebsites.net/post',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    }).then( (res) => {
      return res.json();
    }).catch( (err) => {
      console.log(err);
    });


  }
  renderCamera() {
    return (
      <Camera 
      style={styles.preview}
      aspect={Camera.constants.Aspect.fill}
      captureTarget={Camera.constants.CaptureTarget.disk}>
         <TouchableHighlight
          style={styles.capture}
          onPress={this.takePicture.bind(this)}
          underlayColor="rgba(255, 255, 255, 0.5)"  >
      <View />
      </TouchableHighlight>
      </Camera>

    );
  }

  renderImage() {
    return (
      <View>
            <Image source={{ uri: this.state.path }}   style={styles.preview}   />
            <Text   style={styles.cancel}     onPress={() => this.setState({ path: null })}   >Cancel</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={Style.cameracontainer}>
           {this.state.path ? this.renderImage() : this.renderCamera()}
          <View style={Style.cameraContainer}>
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


  takePicture() {
    this.camera.capture()
    .then((data) => {
      console.log(data);
      this.setState({ path: data.path })
    })
    .catch(err => console.error(err));
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(Post);
