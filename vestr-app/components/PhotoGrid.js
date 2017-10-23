import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { map } from "lodash";
import Image from "react-native-image-progress";

const renderPhotos = () => {
  const photos = [
    { id: 0, url: "http://placeimg.com/200/200/any" },
    { id: 1, url: "http://placeimg.com/201/201/any" },
    { id: 2, url: "http://placeimg.com/202/202/any" },
    { id: 3, url: "http://placeimg.com/203/203/any" },
    { id: 4, url: "http://placeimg.com/204/204/any" },
    { id: 5, url: "http://placeimg.com/205/205/any" },
    { id: 6, url: "http://placeimg.com/206/206/any" },
    { id: 7, url: "http://placeimg.com/207/207/any" },
    { id: 8, url: "http://placeimg.com/208/208/any" },
    { id: 9, url: "http://placeimg.com/209/209/any" },
    { id: 10, url: "http://placeimg.com/200/200/any" },
    { id: 11, url: "http://placeimg.com/201/201/any" },
    { id: 12, url: "http://placeimg.com/202/202/any" },
    { id: 13, url: "http://placeimg.com/203/203/any" },
    { id: 14, url: "http://placeimg.com/204/204/any" }
  ];

  return map(photos, photo => (
    <View style={styles.imageContainer} key={photo.id}>
      <Image style={styles.image} source={{ uri: photo.url }} alt={photo} />
    </View>
  ));
};

const PhotoGrid = () => (
  <View style={styles.container}>
    <Text style={styles.title}>NEARBY ACTIVITY</Text>

    <ScrollView directionalLockEnabled horizontal>
      {renderPhotos()}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    margin: 3
  },

  title: {
    margin: 10,
    color: "#AAA",
    fontSize: 13,
    fontWeight: "600"
  },

  image: {
    height: 200,
    width: 200,
    marginRight: 3
  }
});

export default PhotoGrid;
