export const UPDATE = "UPDATE";
export const FETCH_INSIGHT = "FETCH_INSIGHT"
export const FETCH_MARS_ROVER = "FETCH_MARS_ROVER"
export const FETCH_OPEN_WEATHER = "FETCH_OPEN_WEATHER"
export const CLEAR_REDIRECT = "CLEAR_REDIRECT";
export const SET_ZIP = "SET_ZIP";
export const SET_POSITION = "SET_POSITION";
export const SET_LOCATION = "SET_LOCATION";
export const SET_IMAGE = "SET_IMAGE";
export const SET_REDIRECT = "SET_REDIRECT";
export const SET_SOL = "SET_SOL";
export const SET_ERROR = "SET_ERROR";
export const TEST = "TEST";

export const initialState = {
  insight: { sol_keys: [] },
  mars_rover: [],
  image: false,
  open_weather: false,
  update: false,
  redirect: false,
  zip: "",
  position: {},
  location: {},
  endpoint: "",
  earth_endpoint: "",
  sol: "",
  error: {},
  test: false
}

export const reducer = (prevState, { type, payload }) => {
  switch (type) {
    case TEST:
      return { ...prevState, test: payload }
    case UPDATE:
      return { ...prevState, update: !prevState.update };
    case FETCH_INSIGHT:
      return { ...prevState, insight: payload };
    case FETCH_MARS_ROVER:
      return { ...prevState, mars_rover: payload };
    case FETCH_OPEN_WEATHER:
      return { ...prevState, open_weather: payload };
    case CLEAR_REDIRECT:
      return { ...prevState, redirect: false };
    case SET_ZIP:
      return { ...prevState, zip: payload, earth_endpoint: `http://api.openweathermap.org/data/2.5/weather?apiKey=ac76788a482dcbce48ce9e4fd8c44ac8&zip=${payload}&units=imperial` };
    case SET_POSITION:
      return { ...prevState, position: payload, earth_endpoint: `http://api.openweathermap.org/data/2.5/weather?apiKey=ac76788a482dcbce48ce9e4fd8c44ac8&lat=${payload.latitude}&lon=${payload.longitude}&units=imperial` };
    case SET_LOCATION:
      return { ...prevState, location: payload };
    case SET_IMAGE:
      return { ...prevState, image: payload };
    case SET_REDIRECT:
      return { ...prevState, redirect: payload };
    case SET_SOL:
      return { ...prevState, sol: payload, endpoint: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=d8vGnKRNvf9gmKhgGq2WVNsE924KcC4rNcmr5xLj&sol=${payload}` };
    case SET_ERROR:
      return { ...prevState, error: payload };
    default:
      return prevState
  }
}
