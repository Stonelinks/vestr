import React, { PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";
import Image from "react-native-image-progress";
import moment from "moment";
import Colors from "../constants/Colors";

const PhotoDetail = props => (
  <View style={styles.commentContainer}>
    <View style={styles.containerLeft}>
      <Image
        style={styles.commentImage}
        source={{ uri: props.comment.profilePicture }}
      />

      <View>
        <Text style={styles.commentUser}>{props.comment.username}</Text>

        <Text style={styles.commentText}>{props.comment.text}</Text>
      </View>
    </View>

    <View style={styles.containerRight}>
      <Text style={styles.commentDate}>
        {moment(props.comment.creationDate).fromNow()}
      </Text>
    </View>
  </View>
);

PhotoDetail.propTypes = {
  comment: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  containerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },

  commentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#eee"
  },

  commentUser: {
    color: Colors.brandB,
    fontSize: 13,
    fontWeight: "700"
  },

  commentText: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 2
  },

  containerRight: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "flex-start"
  },

  commentDate: {
    color: "#bbb",
    fontSize: 10,
    fontWeight: "700"
  }
});

export default PhotoDetail;
