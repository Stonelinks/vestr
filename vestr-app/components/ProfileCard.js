import React, { PropTypes } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo";
import Image from "react-native-image-progress";
import Colors from "../constants/Colors";

class ProfileCard extends React.Component {
  componentDidMount() {
    console.log("profile did mount");
  }

  componentDidUpdate() {
    console.log("profile did update");
  }

  render() {
    return (
      <ScrollView>
        <LinearGradient
          colors={[Colors.rmotrB300, Colors.rmotrB100]}
          style={styles.viewStyle}
        >
          <Image
            style={styles.image}
            source={{ uri: this.props.auth.user.profilePicture }}
            alt={"Image"}
          />

          <Text style={styles.username}>{this.props.auth.user.name}</Text>

          <Text style={styles.email}>{this.props.auth.user.email}</Text>
        </LinearGradient>
      </ScrollView>
    );
  }
}

ProfileCard.propTypes = {
  auth: PropTypes.object
};

const styles = StyleSheet.create({
  viewStyle: {
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },

  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFF",
    marginBottom: 10
  },

  username: {
    color: "#FFF",
    backgroundColor: "transparent",
    fontSize: 16,
    fontWeight: "700"
  },

  email: {
    color: "#EEE",
    backgroundColor: "transparent",
    fontSize: 12
  }
});

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(ProfileCard);
