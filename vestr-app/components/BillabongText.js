import React, { PropTypes } from "react";
import { Text } from "react-native";
import { Font } from "expo";

const BillabongText = props => (
  <Text style={[props.style, Font.style("billabong")]}>{props.children}</Text>
);

BillabongText.propTypes = {
  style: PropTypes.number,
  children: PropTypes.string.isRequired
};

export default BillabongText;
