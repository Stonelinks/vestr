import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import LatoHeader from "../components/LatoHeader";
import PhotoList from "../components/PhotoList";

const PhotoGalleryScreen = () => (
  <View style={styles.container}>
    <PhotoList />
  </View>
);

PhotoGalleryScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <LatoHeader headerText={"Vestr"} />,
    backgroundColor: Colors.brandB,
    tintColor: Colors.brandC
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE"
  }
});

export default PhotoGalleryScreen;
