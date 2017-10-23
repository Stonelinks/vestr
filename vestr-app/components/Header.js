import React, { PropTypes } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const Header = props => (
  <View style={styles.viewStyle}>
    <Text style={styles.textStyle}>{props.headerText}</Text>
  </View>
);

Header.propTypes = {
  headerText: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.rmotrB,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },

  textStyle: {
    color: Colors.rmotrC,
    fontSize: 16,
    fontWeight: "500"
  }
});

export default Header;
