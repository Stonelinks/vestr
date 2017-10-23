import React, { PropTypes } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Image from "react-native-image-progress";
import PhotoHeader from "./PhotoHeader";
import PhotoFooter from "./PhotoFooter";
import { photosActions } from "../state/actions";

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);

    this.likePhoto = this.likePhoto.bind(this);
    this.unlikePhoto = this.unlikePhoto.bind(this);
  }

  likePhoto() {
    this.props.likePhoto(this.props.photo.id);
  }

  unlikePhoto() {
    this.props.unlikePhoto(this.props.photo.id);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <PhotoHeader
          profilePicture={this.props.photo.profilePicture}
          username={this.props.photo.username}
          locationName={this.props.photo.locationName}
          latitude={this.props.photo.latitude}
          longitude={this.props.photo.longitude}
        />

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: this.props.photo.url }}
            alt={this.props.photo.caption}
          />
        </View>

        <PhotoFooter
          photoId={this.props.photo.id}
          photoComments={this.props.photo.comments}
          username={this.props.photo.username}
          photoCaption={this.props.photo.caption}
          creationDate={this.props.photo.creationDate}
          likes={this.props.photo.likes}
          isLiked={this.props.photo.isLiked}
          likePhoto={
            this.props.photo.isLiked ? this.unlikePhoto : this.likePhoto
          }
        />
      </View>
    );
  }
}

PhotoDetail.propTypes = {
  photo: PropTypes.object.isRequired,
  likePhoto: PropTypes.func,
  unlikePhoto: PropTypes.func
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    margin: 5
  },

  imageContainer: {
    alignItems: "stretch"
  },

  image: {
    height: 400
  }
});

const mapStateToProps = state => ({
  photos: state.photos
});

const likePhoto = photosActions.likePhoto;
const unlikePhoto = photosActions.unlikePhoto;

export default connect(mapStateToProps, { likePhoto, unlikePhoto })(
  PhotoDetail
);
