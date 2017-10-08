const NavStyle = {
 headerMode: 'none',        // I don't want a NavBar at top
 tabBarPosition: 'bottom',  // So your Android tabs go bottom
 tabBarOptions: {
  activeTintColor: 'red',  // Color of tab when pressed
  inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
  showIcon: 'true', // Shows an icon for both iOS and Android
  showLabel: 'false', //No label for Android
  labelStyle: {
   fontSize: 11,
  },
  style: {
   backgroundColor: '#F5FCFF', // Makes Android tab bar white instead of standard blue
  }
 },
}

export {
 NavStyle
}
