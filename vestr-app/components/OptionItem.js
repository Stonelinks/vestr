import React, { PropTypes } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const OptionItem = props => (
  <TouchableOpacity
    style={[styles.optionsContainer, { marginBottom: props.marginBottom }]}
    onPress={props.onPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: props.iconColor }]}>
      <FontAwesome style={styles.icon} name={props.icon} />
    </View>

    <Text style={styles.option}>{props.text}</Text>
  </TouchableOpacity>
);

OptionItem.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  marginBottom: PropTypes.number,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 6
  },

  iconContainer: {
    width: 22,
    alignItems: "center",
    borderRadius: 5,
    padding: 3
  },

  icon: {
    color: "#FFF",
    fontSize: 16
  },

  option: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 15
  }
});

export default OptionItem;
