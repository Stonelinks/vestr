import React, { PropTypes } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PhotoComment from "./PhotoComment";
import CommentForm from "./CommentForm";

class PhotoComments extends React.Component {
  constructor(props) {
    super(props);

    this.renderComments = this.renderComments.bind(this);
  }

  renderComments() {
    return this.props.comment.comments.map(comment => (
      <PhotoComment key={comment.id} comment={comment} />
    ));
  }

  render() {
    let componentToRender;

    if (this.props.comment.comments.length) {
      componentToRender = this.renderComments();
    } else {
      componentToRender = (
        <Text style={styles.noPhotos}>This photo has no comments yet! 😌</Text>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView>{componentToRender}</ScrollView>

        <CommentForm comment={this.props.comment} />
      </View>
    );
  }
}

PhotoComments.propTypes = {
  comment: PropTypes.object
};

const styles = StyleSheet.create({
  noPhotos: {
    color: "#AAA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 30
  },

  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(mapStateToProps)(PhotoComments);
