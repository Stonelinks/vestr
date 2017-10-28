import React, { PropTypes } from "react";
import { Text } from "react-native";
import { Font } from "expo";

const LatoText = props => (
  <Text style={[props.style, Font.style("lato")]}>{props.children}</Text>
);

LatoText.propTypes = {
  style: PropTypes.number,
  children: PropTypes.string.isRequired
};

export default LatoText;
