import React, { Component } from 'react';
import { AppRegistry, SectionList, StyleSheet, Button, Text, View } from 'react-native';

export default class Subscriptions extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'Authorities', data: ['Victoria Police','Bureau of Meteorology','Public Transport Victoria']},
            {title: 'Friends', data: ['Alisha', 'James', 'Jillian', 'Luke', 'Joel', 'Kate', 'Julie']},
          ]}
        renderSectionHeader={({section}) => <View >
        									<Text style={styles.sectionHeader}>{section.title}</Text> 
                                            </View> }
        renderItem={({item}) => <Text style={styles.item}>{item}</Text> 		 }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

