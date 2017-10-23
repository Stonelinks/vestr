import React, { PropTypes } from "react";
import { ScrollView, Text, StyleSheet, RefreshControl } from "react-native";
import { connect } from "react-redux";
import PhotoDetail from "./PhotoDetail";
import { photosActions } from "../state/actions";

class PhotoList extends React.Component {
  componentDidMount() {
    this.props.fetchPhotos();
  }

  renderPhotos() {
    const { photos } = this.props;

    return photos.all.map(photo => (
      <PhotoDetail key={photo.id} photo={photo} />
    ));
  }

  render() {
    let componentToRender;

    if (this.props.photos.all.length) {
      componentToRender = this.renderPhotos();
    } else if (!this.props.photos.isFetching) {
      componentToRender = (
        <Text style={styles.noPhotos}>No photos uploaded yet! 😌</Text>
      );
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            title="Searching new photos..."
            titleColor="#999"
            style={{ backgroundColor: "transparent" }}
            refreshing={this.props.photos.isFetching}
            onRefresh={this.props.fetchPhotos}
          />
        }
      >
        {componentToRender}
      </ScrollView>
    );
  }
}

PhotoList.propTypes = {
  photos: PropTypes.object,
  fetchPhotos: PropTypes.func
};

const styles = StyleSheet.create({
  noPhotos: {
    color: "#AAA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30
  }
});

const mapStateToProps = state => ({
  photos: state.photos
});

const fetchPhotos = photosActions.fetchPhotos;

export default connect(mapStateToProps, { fetchPhotos })(PhotoList);
