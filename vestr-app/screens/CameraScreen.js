import React, { PropTypes } from "react";
import { View, StyleSheet, Vibration } from "react-native";
import { connect } from "react-redux";
import { SegmentedControls } from "react-native-radio-buttons";
import Colors from "../constants/Colors";
import Header from "../components/Header";
import ImageForm from "../components/ImageForm";
import CameraOpenRoll from "../components/CameraOpenRoll";
import CameraTakePhoto from "../components/CameraTakePhoto";
import { photoActions } from "../state/actions";

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.setSelectedOption = this.setSelectedOption.bind(this);
  }

  setSelectedOption(selectedOption) {
    Vibration.vibrate();

    this.props.setPhotoSource(selectedOption);
  }

  render() {
    const options = ["Camera roll", "Take a new photo"];

    let cameraComponent;
    let imageForm;

    switch (this.props.photo.source) {
      case "Camera roll":
        cameraComponent = <CameraOpenRoll />;
        break;
      case "Take a new photo":
        cameraComponent = <CameraTakePhoto />;
        break;
      default:
        throw new Error(
          `unhandled entry selectedOption: ${this.props.photo.source}`
        );
    }

    if (this.props.photo.uri) {
      imageForm = <ImageForm photo={this.props.photo} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.segmentedControls}>
          <SegmentedControls
            options={options}
            onSelection={this.setSelectedOption}
            selectedOption={this.props.photo.source}
            tint={"#FFF"}
            selectedTint={Colors.rmotrB}
            backTint={Colors.rmotrB}
          />
        </View>

        {cameraComponent}

        {imageForm}
      </View>
    );
  }
}

CameraScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <Header headerText={"Camera"} />,
    backgroundColor: Colors.rmotrB,
    tintColor: Colors.rmotrC
  }
};

CameraScreen.propTypes = {
  photo: PropTypes.object.isRequired,
  setPhotoSource: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE"
  },

  segmentedControls: {
    backgroundColor: Colors.rmotrB,
    padding: 7,
    paddingTop: 1
  }
});

const mapStateToProps = state => ({
  photo: state.photo
});

const setPhotoSource = photoActions.setPhotoSource;

export default connect(mapStateToProps, { setPhotoSource })(CameraScreen);
