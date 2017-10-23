export const photos = {
  all: [],
  isFetching: true,
  error: ""
};

export const photo = {
  id: null,
  username: "",
  source: "Camera roll",
  caption: "",
  uri: "",
  url: "",
  profilePicture: "",
  location: {
    name: null,
    lat: null,
    lng: null
  },
  comments: [],
  likes: [],
  isLiked: false,
  isUploading: false,
  isUploaded: false,
  creationDate: "",
  error: ""
};

export const comment = {
  id: null,
  photoId: null,
  comments: [],
  username: "",
  text: "",
  profilePicture: "",
  creationDate: "",
  error: ""
};

export const auth = {
  loggedIn: null,
  isLoading: null,
  user: null,
  facebookToken: null,
  error: ""
};
