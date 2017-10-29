import React, { PropTypes } from "react";
import { View, Alert, StyleSheet } from "react-native";
import Exponent, { Permissions } from "expo";
import { connect } from "react-redux";
import { map, includes } from "lodash";
import Colors from "../constants/Colors";
import googleConfig from "../constants/Google";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import OptionItem from "../components/OptionItem";
import { authActions } from "../state/actions";

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      lat: null,
      lng: null,
      locale: null
    };
    this.getPosition = this.getPosition.bind(this);
    this.getLocale = this.getLocale.bind(this);
  }

  getPosition() {
    const options = {
      enableHighAccuracy: true
    };

    Permissions.getAsync(Permissions.LOCATION).then(response => {
      const { status } = response;

      if (status === "denied") {
        Alert.alert(
          "Please allow Location permission from your phone configuration"
        );
      } else {
        Permissions.askAsync(Permissions.LOCATION).then(res => {
          const { status } = res;

          if (status === "granted") {
            Exponent.Location
              .getCurrentPositionAsync(options)
              .then(response => {
                const infoUrl = googleConfig.getInfoUrl(
                  response.coords.latitude,
                  response.coords.longitude
                );

                return fetch(infoUrl)
                  .then(resp => resp.json())
                  .then(json => {
                    const locationInfo = json.results[0];
                    let locality;
                    let country;

                    map(locationInfo.address_components, component => {
                      if (includes(component.types, "locality")) {
                        locality = component.long_name;
                      } else if (includes(component.types, "country")) {
                        country = component.long_name;
                      }
                    });

                    this.setState({
                      name: `${locality}, ${country}`,
                      lat: locationInfo.geometry.location.lat,
                      lng: locationInfo.geometry.location.lng
                    });
                  });
              });
          }
        });
      }
    });
  }

  getLocale() {
    Exponent.Util.getCurrentLocaleAsync().then(response => {
      this.setState({
        locale: response
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ProfileCard />

        <OptionItem
          text={
            this.state.locale
              ? `Current locale: ${this.state.locale}`
              : "Get device locale"
          }
          icon={"globe"}
          iconColor={Colors.primary}
          onPress={this.getLocale}
          marginBottom={10}
        />

        <OptionItem
          text={this.state.name ? this.state.name : "Get my position"}
          icon={"map-marker"}
          iconColor={Colors.warning}
          onPress={this.getPosition}
          marginBottom={10}
        />

        <OptionItem
          text={"Sign out"}
          icon={"sign-out"}
          iconColor={Colors.danger}
          onPress={this.props.logout}
          marginBottom={40}
        />
      </View>
    );
  }
}

ProfileScreen.route = {
  navigationBar: {
    visible: true,
    renderTitle: () => <Header headerText={"Profile"} />,
    backgroundColor: Colors.brandB,
    tintColor: Colors.brandC
  }
};

ProfileScreen.propTypes = {
  logout: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch"
  }
});

const logout = authActions.logout;

export default connect(null, { logout })(ProfileScreen);
