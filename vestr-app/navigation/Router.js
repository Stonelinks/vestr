import { createRouter } from "@expo/ex-navigation";
import PhotoCommentsScreen from "../screens/PhotoCommentsScreen";
import PhotoGalleryScreen from "../screens/PhotoGalleryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CameraScreen from "../screens/CameraScreen";
import MapScreen from "../screens/MapScreen";
import RootNavigation from "./RootNavigation";

const Router = createRouter(() => ({
  photoComments: () => PhotoCommentsScreen,
  photoGallery: () => PhotoGalleryScreen,
  profile: () => ProfileScreen,
  camera: () => CameraScreen,
  map: () => MapScreen,
  rootNavigation: () => RootNavigation
}));

export default Router;
