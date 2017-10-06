import React, { Component } from 'react';
import { SectionList,TouchableHighlight, Button, Text, View } from 'react-native';
import styles  from './../../Style/Standard.js'

//data imports, delete later
import friendssubscriptions from './../Data/friendsList.json'
import authoritysubscriptions from './../Data/authorityList.json'

export default class Subscriptions extends Component {
  render() {
    return (
      <View style={styles.container}>
      <SectionList
      sections={[
        {title: 'Authorities', data: authoritysubscriptions},
        {title: 'Friends', data: friendssubscriptions},
      ]}
      renderSectionHeader={({section}) =>
      <View  >
      <Text style={styles.sectionHeader}>{section.title}</Text>

      </View> }
      renderItem={({item}) =>
      <View>
      <View  key={item.ID} style={styles.row}>
      <View   style={styles.box}>
      <TouchableHighlight onPress={() => this.props.navigation.navigate("UserView")}>
      <Text style={styles.sectionItem}>{item.Name}</Text>
      </TouchableHighlight>
      </View>

      <View   style={styles.box}>
      <Button title="Unsubscribe" onPress={() => this.props.navigation.navigate("Profile")} />
      </View>

      </View>
      <View style={styles.seperator}/>
</View>
         }
      />

      </View>
    );
  }
}
