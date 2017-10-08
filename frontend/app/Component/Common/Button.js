/**
 * Button.js
 * Button Component
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 01-Oct-2017
 * Last Modified By: Ha Jin Song
 */

 import React from "react";
 import { Button } from "react-native-elements";


const NAV_BUTTON_COLOR = '#03A9F4';
const NAV_BUTTON_STYLE = { marginTop: 20 };

const ACTION_BUTTON_COLOR = 'red'
const ACTION_BUTTON_STYLE = { marginTop: 20 };

const ActionButton = ({ title, onPress, disabled }) => (
 <Button
  buttonStyle={ACTION_BUTTON_STYLE}
  backgroundColor={ACTION_BUTTON_COLOR}
  title={title}
  disabled={disabled}
  onPress={ () => onPress()}
 />
)

const NavButton = ({title, onPress}) => (
 <Button
  buttonStyle={NAV_BUTTON_STYLE}
  backgroundColor={NAV_BUTTON_COLOR}
  title={title}
  onPress={ () => onPress()}
 />
);

export {
 NavButton, ActionButton
}
