import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import BillabongHeader from "../components/BillabongHeader";
import PhotoList from "../components/PhotoList";

const PhotoGalleryScreen = () => (
  <View style={styles.container}>
    <PhotoList />
  </View>
);

PhotoGalleryScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <BillabongHeader headerText={"Rmotrgram"} />,
    backgroundColor: Colors.rmotrB,
    tintColor: Colors.rmotrC
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE"
  }
});

export default PhotoGalleryScreen;
