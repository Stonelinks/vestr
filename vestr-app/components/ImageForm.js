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
import { takeSnapshotAsync } from "expo";
import Image from "react-native-image-progress";
import { withNavigation } from "@expo/ex-navigation";
import Colors from "../constants/Colors";
import { photoActions } from "../state/actions";
import FaceDetector from "../utils/FaceDetector";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import Dimensions from "Dimensions";
import moment from "moment";
@withNavigation
class ImageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null
    };

    this.updateTextCaptionValue = this.updateTextCaptionValue.bind(this);
    this.savingAttempt = this.savingAttempt.bind(this);
    this.handleCanvas = this.handleCanvas.bind(this);
    this.handlePreviewCanvas = this.handlePreviewCanvas.bind(this);
  }

  handlePreviewCanvas(canvas) {
    this.previewCanvas = canvas;
    bye(canvas);
  }
  handleCanvas(canvas) {
    const { photo } = this.props;

    this.faceDetector = new FaceDetector(canvas);
    const screenWidth = Dimensions.get("window").width;
    canvas.width = screenWidth;
    canvas.height = screenWidth;
    const image = new CanvasImage(canvas);

    image.addEventListener("load", async () => {
      image.width = screenWidth;
      image.height = screenWidth;

      const {faces, ctx} = await this.faceDetector.detect(image);
      console.warn(JSON.stringify(faces, null, 2));

      if (faces.length) {
        ctx.fillStyle = "purple";

        // ctx.beginPath();
        // ctx.lineWidth = "10";
        // ctx.strokeStyle = "#0f0";
        // for (var i = 0; i < faces.length; i++) {
        //     ctx.rect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
        //   // ctx.fillRect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
        // }
        //
        // // ctx.fillRect(0, 0, 100, 100);
        // //
        // // ctx.fillRect(100, 100, 10, 100);
        // ctx.stroke();

        // const screenWidth = Dimensions.get("window").width;
        // canvas.width = screenWidth;
        // canvas.height = screenWidth;

        // this.previewCanvas.width = screenWidth;
        // this.previewCanvas.height = screenWidth;
        // const previewCtx = this.previewCanvas.getContext("2d");
        //
        // await previewCtx.drawImage(canvas, 0, 0, screenWidth, screenWidth);
        // bye(canvas);

        // const imageData = await this.ctx.getImageData(
        //   0,
        //   0,
        //   canvasWidth,
        //   canvasHeight
        // );

        // const imageData = await canvas.toDataURL()
        // const imageData = await  takeSnapshotAsync(this._canvasContainer, {
        //   result: 'data-uri'
        // })
        // this.setState({
        //   imageData
        // })
      }
    });

    image.src = photo.uri;
  }

  updateTextCaptionValue(caption) {
    this.props.setPhotoCaption(caption);
  }

  savingAttempt() {
    Alert.alert("Really want to save that picture?", null, [
      { text: "Cancel", onPress: () => null, style: "cancel" },
      { text: "Save", onPress: () => this.savePhoto() }
    ]);
  }

  savePhoto() {
    const { photo } = this.props;

    // Set default caption if empty
    if (!photo.caption) this.updateTextCaptionValue("Funny text goes here 😁");

    this.props.addPhoto(this.props.photo);

    // this.goToGallery();
  }

  goToGallery() {
    this.props.navigation.performAction(({ tabs }) => {
      tabs("tab-navigation").jumpToTab("photoGallery");
    });
  }

  renderImagePreview() {
    const { imageData } = this.state;
    if (imageData) {
      console.warn(imageData);
      return <Image style={styles.image} source={{ uri: imageData }} />;
    }
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

          {/*{this.renderImagePreview()}*/}
          {/*<View ref={(c) => this._canvasContainer = c}>*/}
          {/*<Canvas ref={this.handlePreviewCanvas} />*/}
          <Canvas ref={this.handleCanvas} />

          {/*</View>*/}
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

function bye(canvas) {
  canvas.width = 1;
  canvas.height = 1;
}
