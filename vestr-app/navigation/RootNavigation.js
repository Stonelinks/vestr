import React from "react";
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem
} from "@expo/ex-navigation";
import { Foundation, FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Router from "../navigation/Router";

class RootNavigation extends React.Component {
  renderFoundationIcon(name, isSelected) {
    return (
      <Foundation
        name={name}
        size={28}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  renderFontAwesomeIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={26}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  render() {
    return (
      <TabNavigation
        id="tab-navigation"
        navigatorUID="tab-navigation"
        tabBarColor={Colors.rmotrB}
        tabBarHeight={42}
        initialTab="photoGallery"
      >
        <TabNavigationItem
          id="photoGallery"
          renderIcon={isSelected =>
            this.renderFoundationIcon("home", isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute("photoGallery")} />
        </TabNavigationItem>

        <TabNavigationItem
          id="camera"
          renderIcon={isSelected =>
            this.renderFoundationIcon("camera", isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute("camera")} />
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          renderIcon={isSelected =>
            this.renderFontAwesomeIcon("user", isSelected)}
        >
          <StackNavigation initialRoute={Router.getRoute("profile")} />
        </TabNavigationItem>
      </TabNavigation>
    );
  }
}

export default RootNavigation;
