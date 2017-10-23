import React, { PropTypes } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { withNavigation } from "@expo/ex-navigation";
import Image from "react-native-image-progress";
import { Ionicons } from "@expo/vector-icons";
import Router from "../navigation/Router";
import Colors from "../constants/Colors";

@withNavigation
class PhotoHeader extends React.Component {
  constructor(props) {
    super(props);

    this.goToMap = this.goToMap.bind(this);
  }

  openShareOptions() {
    return Share.share({
      url: "https://rmotr.com",
      title: "Learn to code in a remote classroom",
      message: "Real teacher, real classmates, real assignments, but remote.",
      dialogTitle: "Learn to code in a remote classroom"
    });
  }

  goToMap() {
    const params = {
      locationName: this.props.locationName,
      latitude: this.props.latitude,
      longitude: this.props.longitude
    };

    this.props.navigator.push(Router.getRoute("map", params));
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.headerImage}
            source={{ uri: this.props.profilePicture }}
            alt="Profile pic"
          />

          <View>
            <Text style={styles.headerText}>{this.props.username}</Text>

            <Text
              style={styles.headerLocation}
              onPress={
                this.props.latitude && this.props.longitude
                  ? this.goToMap
                  : null
              }
            >
              {this.props.locationName} &gt;
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.openShareOptions}>
          <Ionicons style={styles.shareIcon} name="md-share" />
        </TouchableOpacity>
      </View>
    );
  }
}

PhotoHeader.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  navigator: PropTypes.array
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center"
  },

  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },

  headerText: {
    color: Colors.rmotrB,
    fontSize: 13,
    fontWeight: "700"
  },

  headerLocation: {
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2
  },

  shareIcon: {
    color: Colors.rmotrB100,
    fontSize: 18,
    padding: 10
  }
});

export default PhotoHeader;
