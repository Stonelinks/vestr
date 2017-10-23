import React, { PropTypes } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient, MapView } from "expo";

const Map = props => (
  <MapView
    style={styles.mapView}
    initialRegion={{
      latitude: props.latitude,
      longitude: props.longitude,
      latitudeDelta: 0.15,
      longitudeDelta: 0.08
    }}
  >
    <MapView.Marker
      coordinate={{
        latitude: props.latitude,
        longitude: props.longitude
      }}
    />
  </MapView>
);

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1
  }
});

export default Map;
