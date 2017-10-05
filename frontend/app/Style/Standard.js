import {StyleSheet} from 'react-native'



export default StyleSheet.create({

  //PROFILE STYLES
  profileImage: {
    width: 80,
    height: 80
  },
  profileNumbers: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf:'center'
  },
  username:{
    fontSize:17,
    color:'black',
    fontWeight:'400'
  },
  details: {
    color: 'gray',
    fontSize: 12
  },
  location: {
    fontSize: 14
  },

  seperator:
  {height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },

  //CONTAINER STYLES
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 3,
    marginRight: 10,
    marginLeft: 10
  },
  horizontalBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  box: {
    flex: 1
  },
  container:{
    flexDirection:'column',

    height: '100%',
    backgroundColor:'white',
    padding:10
  },
  imageWrapper:{
    flex:1,
    justifyContent:'center',
    alignSelf:'center'
  },
  image:{
    height:60,
    width:60,
    borderRadius:30,
    alignSelf:'center'
  },

  date: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 10
  },
  title: {
    color: 'black',
    fontSize: 18
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  sectionItem: {
    padding: 10,
    fontSize: 12,
    height: 44,
  },
  unsubscribeButton : {

  }

});
