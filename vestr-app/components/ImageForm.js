import React, { PropTypes } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import Image from "react-native-image-progress";
import { withNavigation } from "@expo/ex-navigation";
import Colors from "../constants/Colors";
import { photoActions } from "../state/actions";

@withNavigation
class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.updateTextCaptionValue = this.updateTextCaptionValue.bind(this);
    this.savingAttempt = this.savingAttempt.bind(this);
    // it's not necessary to bind savePhoto
  }

  updateTextCaptionValue(caption) {
    this.props.setPhotoCaption(caption);
  }

  savingAttempt() {
    Alert.alert("Really want to save that picture?", null, [
      { text: "Save", onPress: () => this.savePhoto() },
      { text: "Cancel", onPress: () => null, style: "cancel" }
    ]);
  }

  savePhoto() {
    const { photo } = this.props;

    // Set default caption if empty
    if (!photo.caption) this.updateTextCaptionValue("Funny text goes here 😁");

    this.props.addPhoto(this.props.photo);

    this.goToGallery();
  }

  goToGallery() {
    this.props.navigation.performAction(({ tabs }) => {
      tabs("tab-navigation").jumpToTab("photoGallery");
    });
  }

  render() {
    let componentToRender;

    if (this.props.photo.isUploading) {
      componentToRender = (
        <ActivityIndicator style={styles.loadingIndicator} size="small" />
      );
    } else {
      componentToRender = (
        <TouchableOpacity
          style={styles.shareTextContainer}
          onPress={this.savingAttempt}
        >
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a caption..."
              onChangeText={this.updateTextCaptionValue}
              value={this.props.photo.caption}
              autoCorrect={false}
            />

            {componentToRender}
          </View>

          <Image style={styles.image} source={{ uri: this.props.photo.uri }} />
        </View>
      </View>
    );
  }
}

ImageForm.propTypes = {
  photo: PropTypes.object.isRequired,
  setPhotoCaption: PropTypes.func,
  addPhoto: PropTypes.func,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    flexDirection: "column"
  },

  loadingIndicator: {
    marginRight: 15
  },

  imageContainer: {
    alignItems: "stretch",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },

  formContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row"
  },

  textInput: {
    flex: 1,
    height: 40,
    fontSize: 13,
    padding: 10
  },

  inputContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  shareTextContainer: {
    justifyContent: "center",
    padding: 10
  },

  shareText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold"
  },

  image: {
    height: 280
  }
});

const setPhotoCaption = photoActions.setPhotoCaption;
const addPhoto = photoActions.addPhoto;

export default connect(null, { setPhotoCaption, addPhoto })(ImageForm);
