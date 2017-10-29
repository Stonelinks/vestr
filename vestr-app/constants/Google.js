const googleConfig = {
  iosClientId:
    "137627682663-9jp3m7o374fontme7hb99de7ep7ftl6m.apps.googleusercontent.com",
  androidClientId:
    "137627682663-3qiaeqmcb56vt5f6utse4iunnuctdv5i.apps.googleusercontent.com",
  maps: {
    apiKey: "AIzaSyDajK5BDxSh1BHigFUgHfCuZTOk2zEWPYs",
    url: "https://maps.googleapis.com/maps/api/geocode/json"
  },
  getInfoUrl: (lat, lng) => {
    const url = `${googleConfig.maps
      .url}?latlng=${lat},${lng}&key=${googleConfig.maps.apiKey}`;
    return url;
  }
};

export default googleConfig;
