const googleConfig = {
  iosClientId:
    "527537311057-mv7daphvl99b8774a8eqkaebrtb2d1n0.apps.googleusercontent.com",
  androidClientId:
    "527537311057-4dd46li67cv5rcmi0eph1sjoo5d7e3a7.apps.googleusercontent.com",
  maps: {
    apiKey: "AIzaSyAm_T8kZSRaQ2KGLeXBdSuZ01zqsmROq2c",
    url: "https://maps.googleapis.com/maps/api/geocode/json"
  },
  getInfoUrl: (lat, lng) => {
    const url = `${googleConfig.maps
      .url}?latlng=${lat},${lng}&key=${googleConfig.maps.apiKey}`;
    return url;
  }
};

export default googleConfig;
