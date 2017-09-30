/**
 * Button.js
 * Button Component
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: 29-Sept-2017
 */

 import React from "react";
 import { Button } from "react-native-elements";


const NAV_BUTTON_COLOR = '#03A9F4';
const NAV_BUTTON_STYLE = { marginTop: 20 };


export const NavButton = ({title, onPress}) => (
 <Button
  buttonStyle={NAV_BUTTON_STYLE}
  backgroundColor={NAV_BUTTON_COLOR}
  title={title}
  onPress={ () => onPress()}
 />
);
