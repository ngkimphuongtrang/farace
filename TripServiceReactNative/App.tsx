import React from 'react';
import Map from './src/screens/Map';
import SignIn from './src/screens/SignIn';
import { AuthProvider } from './src/contexts/Auth';
import { Router } from './src/routes/Router';
import AddJourneyScreen from './src/screens/AddJourneyScreen';
const App = ()=> {
  return (
     <Map/>
  );
};

export default App;

// import React from 'react';


// import { Router } from './src/routes/Router';
// import { AuthProvider } from './src/contexts/Auth';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router />
//     </AuthProvider>
//   );
// };

// export default App;