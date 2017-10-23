import React, { PropTypes } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import { connect } from "react-redux";
import Colors from "../constants/Colors";
import { commentActions } from "../state/actions";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.updateTextCaptionValue = this.updateTextCaptionValue.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  updateTextCaptionValue(text) {
    this.props.setCommentText(text);
  }

  saveComment() {
    if (this.props.comment.text.length) {
      this.props.addComment(this.props.comment);
    }
  }

  render() {
    let componentToRender;

    if (this.props.comment.isUploading) {
      componentToRender = <ActivityIndicator size="small" />;
    } else {
      componentToRender = (
        <TouchableOpacity style={styles.commentText} onPress={this.saveComment}>
          <Text style={this.props.comment.text ? styles.text : styles.textOff}>
            Post
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            onChangeText={this.updateTextCaptionValue}
            value={this.props.comment.text}
            autoCorrect={false}
          />

          {componentToRender}
        </View>

        <KeyboardSpacer topSpacing={-41.5} />
      </View>
    );
  }
}

CommentForm.propTypes = {
  comment: PropTypes.object,
  setCommentText: PropTypes.func,
  addComment: PropTypes.func
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "stretch",
    borderTopWidth: 1,
    borderColor: "#ddd"
  },

  commentInput: {
    flex: 1,
    height: 40,
    fontSize: 13,
    padding: 10
  },

  commentText: {
    justifyContent: "center",
    padding: 10
  },

  text: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold"
  },

  textOff: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0.5
  }
});

const setCommentText = commentActions.setCommentText;
const addComment = commentActions.addComment;

export default connect(null, { setCommentText, addComment })(CommentForm);
