import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationStyles } from "@expo/ex-navigation";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import PhotoComments from "../components/PhotoComments";

const PhotoCommentsScreen = () => (
  <View style={styles.container}>
    <PhotoComments />
  </View>
);

PhotoCommentsScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <Header headerText={"Comments"} />,
    backgroundColor: Colors.brandB,
    tintColor: Colors.brandC
  },
  styles: NavigationStyles.FloatHorizontal
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default PhotoCommentsScreen;
