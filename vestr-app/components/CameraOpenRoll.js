import React, { PropTypes } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Foundation } from "@expo/vector-icons";
import { ImagePicker, LinearGradient } from "expo";
import Colors from "../constants/Colors";
import { photoActions } from "../state/actions";

class CameraOpenRoll extends React.Component {
  constructor(props) {
    super(props);

    this.showRoll = this.showRoll.bind(this);
  }

  async showRoll() {
    const imagePickerConfig = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    };

    await ImagePicker.launchImageLibraryAsync(
      imagePickerConfig
    ).then(result => {
      const photo = result;

      if (photo.uri) {
        this.props.setPhotoURI(photo.uri);
      }
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={this.showRoll}>
          <LinearGradient
            colors={[Colors.rmotrB100, Colors.rmotrB300, Colors.rmotrB]}
            style={styles.linearGradient}
          >
            <Foundation style={styles.icon} name="photo" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

CameraOpenRoll.propTypes = {
  setPhotoURI: PropTypes.func
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.rmotrB
  },

  linearGradient: {
    alignItems: "center"
  },

  iconContainer: {
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center"
  },

  icon: {
    backgroundColor: "transparent",
    color: "#FFF",
    fontSize: 38,
    padding: 5
  }
});

const setPhotoURI = photoActions.setPhotoURI;

export default connect(null, { setPhotoURI })(CameraOpenRoll);
