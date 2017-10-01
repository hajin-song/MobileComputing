import { StyleSheet, Dimensions } from "react-native";

export default Style = StyleSheet.create({
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
