import { View, Platform, StatusBar } from "react-native";

const HeaderStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export {
 HeaderStyle
}
