import React, { PropTypes } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { withNavigation } from "@expo/ex-navigation";
import moment from "moment";
import Router from "../navigation/Router";
import Colors from "../constants/Colors";
import { commentActions } from "../state/actions";

@withNavigation
class PhotoFooter extends React.Component {
  constructor(props) {
    super(props);

    this.goToComments = this.goToComments.bind(this);
  }

  goToComments() {
    this.props.setPhotoComments(this.props.photoId, this.props.photoComments);

    this.props.navigator.push(Router.getRoute("photoComments"));
  }

  render() {
    return (
      <View style={styles.footer}>
        <View style={styles.footerTop}>
          <TouchableOpacity>
            <Ionicons
              style={styles.footerIcon}
              name={this.props.isLiked ? "ios-heart" : "ios-heart-outline"}
              color={this.props.isLiked ? Colors.danger : "#555"}
              onPress={this.props.likePhoto}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons
              style={styles.footerIcon}
              name="ios-chatboxes-outline"
              color="#555"
              onPress={this.goToComments}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footerMiddle}>
          <Ionicons name="ios-heart" size={12} color={Colors.brandB} />

          <Text style={styles.likesText}>
            {this.props.isLiked
              ? this.props.likes.length + 1
              : this.props.likes.length}
            {this.props.likes.length === 1 ||
            (this.props.likes.length === 0 && this.props.isLiked)
              ? " like"
              : " likes"}
          </Text>
        </View>

        <View style={styles.footerBottom}>
          <Text style={styles.footerText}>{this.props.username}</Text>

          <Text style={styles.photoCaption}>{this.props.photoCaption}</Text>
        </View>

        <View>
          <Text style={styles.footerHour}>
            {moment(this.props.creationDate)
              .fromNow()
              .toUpperCase()}
          </Text>
        </View>
      </View>
    );
  }
}

PhotoFooter.propTypes = {
  photoId: PropTypes.string,
  username: PropTypes.string,
  photoComments: PropTypes.array,
  photoCaption: PropTypes.string,
  creationDate: PropTypes.string,
  likes: PropTypes.array,
  isLiked: PropTypes.bool,
  likePhoto: PropTypes.func.isRequired,
  setPhotoComments: PropTypes.func,
  navigator: PropTypes.array
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "column",
    padding: 5,
    paddingLeft: 7
  },

  footerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },

  footerIcon: {
    fontSize: 26,
    padding: 4,
    paddingRight: 10
  },

  footerMiddle: {
    flexDirection: "row",
    alignItems: "center"
  },

  likesText: {
    color: Colors.brandB,
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 5
  },

  footerBottom: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 5
  },

  footerText: {
    color: Colors.brandB,
    fontSize: 13,
    fontWeight: "700"
  },

  photoCaption: {
    color: Colors.brandB,
    fontSize: 13,
    fontWeight: "400",
    paddingLeft: 3
  },

  footerHour: {
    color: "#AAA",
    fontSize: 10,
    fontWeight: "400",
    paddingTop: 5
  }
});

const setPhotoComments = commentActions.setPhotoComments;

export default connect(null, { setPhotoComments })(PhotoFooter);
