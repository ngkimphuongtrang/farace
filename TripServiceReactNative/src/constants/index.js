// Define color constants
export const colors = {
  primary: '#009387',
  switch1: '#E5F0EB',
  switch2: '#568C73',
};

// Define domain constants
const USER_DOMAIN = 'https://0504-2001-ee0-51d9-d10-a9e8-3744-3ac-4770.ngrok-free.app/api/v1/user';
const TRIP_DOMAIN = 'https://a09d-2001-ee0-51d9-d10-a9e8-3744-3ac-4770.ngrok-free.app/api/v1/trip';
const ROUTE_DOMAIN = '';

export const endpoints = {
  register: `${USER_DOMAIN}/register`,
  login: `${USER_DOMAIN}/login`,
  userDetail: USER_DOMAIN,
  userSearch: `${USER_DOMAIN}/search`,
  sendFriend: `${USER_DOMAIN}/send`,
  acceptRequest: `${USER_DOMAIN}/accept`,
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
  userDomain: 'userDomain',
  tripDomain: 'tripDomain',
};

