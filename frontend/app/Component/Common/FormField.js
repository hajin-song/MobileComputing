/**
 * FormField.js
 * Component for Form Field, including a label.
 * Created On: 29-Sept-2017
 * Created By: Ha Jin Song
 * Last Modified On: 29-Sept-2017
 * Last Modified By: 29-Sept-2017
 */

import React from 'react';
import { View } from "react-native";
import { FormLabel, FormInput } from "react-native-elements";


export const FormField = ({title, placeholder, defaultValue, onChange }) =>
 (
  <View>
   <FormLabel>{title}</FormLabel>
   <FormInput
    value={defaultValue}
    placeholder={placeholder}
    onChangeText={val=>onChange(val)}
   />
  </View>
 );

 export const FormFieldPassword = ({title, placeholder, defaultValue, onChange}) =>
  (
   <View>
    <FormLabel>{title}</FormLabel>
    <FormInput
     value={defaultValue}
     placeholder={placeholder}
     onChangeText={val=>onChange(val)}
     secureTextEntry
    />
   </View>
  );
