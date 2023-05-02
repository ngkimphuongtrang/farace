// export const primaryColor = '#009387';

// export const genericColor1 = "#33AA88";

// export const genericColor2 = "#5FC184";

// export const genericColor3 = "#8ED67D";

// export const genericColor4 = "#C1E875";

// export const genericColor5 = "#F9F871";

// export const twistedPlot1 = "#FF79E2";

// export const twistedPlot2 = "#FFE5FF";

// export const spotColor1 = "#57CABC";

// export const spotColor2 = "#C2FCF3";

// const userDomain = "https://b196-171-254-151-122.ngrok-free.app/api/v1/user";

// const tripDomain = "https://211c-171-254-151-122.ngrok-free.app/api/v1/trip";

// export const registerDomain = userDomain + "/register";

// export const loginDomain = userDomain + "/login";

// export const getMembersDomain = userDomain;

// export const getTripDomain = tripDomain + "/customer/";

// export const getTripDetailDomain = tripDomain + "/";

// export const postTripDomain = tripDomain;

// export const Google_API_Key = "AIzaSyD9ZpLS4jPei6Vo-UYrb7kXI9uWf4cZadg";

// export const userIdKey = '@userId';

// export const usernameKey = '@username';

// Define color constants
export const colors = {
  primary: '#009387',
  generic1: '#33AA88',
  generic2: '#5FC184',
  generic3: '#8ED67D',
  generic4: '#C1E875',
  generic5: '#F9F871',
  twisted1: '#FF79E2',
  twisted2: '#FFE5FF',
  spot1: '#57CABC',
  spot2: '#C2FCF3',
};

// Define domain constants
const API_USER_DOMAIN = 'https://5958-171-255-142-154.ngrok-free.app/api/v1/user';
const API_TRIP_DOMAIN = 'https://c995-171-255-142-154.ngrok-free.app/api/v1/trip';
const USER_DOMAIN = `${API_USER_DOMAIN}/user`;
const TRIP_DOMAIN = `${API_TRIP_DOMAIN}/trip`;

export const endpoints = {
  register: `${USER_DOMAIN}/register`,
  login: `${USER_DOMAIN}/login`,
  members: USER_DOMAIN,
  trip: `${TRIP_DOMAIN}/customer/`,
  tripDetail: TRIP_DOMAIN,
  postTrip: TRIP_DOMAIN,
};

export const keys = {
  googleApiKey: 'AIzaSyD9ZpLS4jPei6Vo-UYrb7kXI9uWf4cZadg',
  userId: '@userId',
  username: '@username',
};

