import React, { PropTypes } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Foundation } from "@expo/vector-icons";
import { ImagePicker, LinearGradient } from "expo";
import Colors from "../constants/Colors";
import { photoActions } from "../state/actions";

class CameraTakePhoto extends React.Component {
  constructor(props) {
    super(props);

    this.showCamera = this.showCamera.bind(this);
  }

  async showCamera() {
    const imagePickerConfig = {
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    };

    await ImagePicker.launchCameraAsync(imagePickerConfig).then(result => {
      const photo = result;

      if (photo.uri) {
        this.props.setPhotoURI(photo.uri);
      }
    });
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={this.showCamera}>
          <LinearGradient
            colors={[Colors.brandB100, Colors.brandB300, Colors.brandB]}
            style={styles.linearGradient}
          >
            <Foundation style={styles.icon} name="camera" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

CameraTakePhoto.propTypes = {
  setPhotoURI: PropTypes.func
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.brandB
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

export default connect(null, { setPhotoURI })(CameraTakePhoto);
