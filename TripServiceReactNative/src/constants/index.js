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
  switch1: '#E5F0EB',
  switch2: '#568C73',
};

// Define domain constants
const USER_DOMAIN = 'https://f4a1-2001-ee0-5202-8950-94c2-af6f-5444-7810.ngrok-free.app/api/v1/user';
const TRIP_DOMAIN = 'https://38ee-2001-ee0-5202-8950-94c2-af6f-5444-7810.ngrok-free.app/api/v1/trip';
const ROUTE_DOMAIN = 'https://db49-58-187-184-83.ngrok-free.app/api/v1/routes';

export const endpoints = {
  register: `${USER_DOMAIN}/register`,
  login: `${USER_DOMAIN}/login`,
  userDetail: USER_DOMAIN,
  members: USER_DOMAIN,
  trip: `${TRIP_DOMAIN}/customer/`,
  tripDetail: TRIP_DOMAIN,
  postTrip: TRIP_DOMAIN,
  getDistance: ROUTE_DOMAIN,
  start: `${TRIP_DOMAIN}/start`,
  realTime: `${TRIP_DOMAIN}/realtime`,
};

export const keys = {
  googleApiKey: 'AIzaSyD9ZpLS4jPei6Vo-UYrb7kXI9uWf4cZadg',
  userId: '@userId',
  username: '@username',
  location: '@location',
  member: '@member',
  groupId: 'groupId',
};

