import React, { PropTypes } from "react";
import { View, StyleSheet } from "react-native";
import BillabongText from "./BillabongText";
import Colors from "../constants/Colors";

const Header = props => (
  <View style={styles.viewStyle}>
    <BillabongText style={styles.textStyle}>{props.headerText}</BillabongText>
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
    fontSize: 28,
    fontWeight: "900"
  }
});

export default Header;
