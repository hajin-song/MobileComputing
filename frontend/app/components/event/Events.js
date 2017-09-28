import React,{Component} from 'react'
import {StyleSheet,TouchableHighlight,View,Image,Text,FlatList} from 'react-native'
import events from './../Data/Events.json'
import comments from './../Data/comments.json'
import { List, ListItem } from "react-native-elements";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { StackNavigator } from 'react-navigation';

export default class Event extends Component{
navigate(routeName,st) {
    this.props.navigator.push({
      name: routeName
    });
  }


render(){
  
return(
<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
     

           <FlatList
          data={events}
          renderItem={({ item }) => (
            <View key={item.EventID} >
            <View style={{alignSelf: 'center'}}>
            <Text style={styles.title} > {item.Name} </Text><Text style={styles.date} > {item.Location} </Text> 
            <Text style={styles.date} > {item.Date} </Text><Text style={styles.details}> {item.Details} </Text> 
            </View>
           <Image  style={{width:'100%',height:250, marginBottom:5}} source = {{uri:item.Image}} />
         
          <TouchableHighlight onPress={() => this.props.navigation.navigate("Event")}> 
           <EvilIcons name ='comment' size={30}  />
            </TouchableHighlight>
           <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
     

           <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View>
           <Text key={item.CommentID} > {item.Commenter} {item.Comment} </Text>
           </View>
          )}
          keyExtractor={item => item.CommentID}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />

      </List>
      <Text> {'\n'} </Text>
           </View>
          )}
          keyExtractor={item => item.EventID}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>

	);}}

 


const styles = StyleSheet.create(
{
	row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10
  },
  box: {
    flex: 1,
    height: 100
  },
  date: {
    alignSelf: 'center',
     color: 'gray',
    fontWeight: 'bold',
    fontSize: 10
  },
  title: {
    alignSelf: 'center',
     color: 'gray',
    fontWeight: 'bold',
    fontSize: 24
  }
  ,
  details: {
    alignSelf: 'center',
     color: 'gray',
    fontSize: 15
  }
})