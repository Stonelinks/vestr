import React, { PropTypes } from "react";
import { View, StyleSheet } from "react-native";
import LatoText from "./LatoText";
import Colors from "../constants/Colors";

const Header = props => (
  <View style={styles.viewStyle}>
    <LatoText style={styles.textStyle}>{props.headerText}</LatoText>
  </View>
);

Header.propTypes = {
  headerText: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.brandB,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },

  textStyle: {
    color: Colors.brandA,
    fontSize: 28,
    fontWeight: "900"
  }
});

export default Header;
