import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/Navigation/Navigation';
import {persistor, store} from './src/Screens/MyProject/Redux/store';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor} />
//       <Navigation />
//     </Provider>
//   );
// };
const App = () => {
  return <Navigation />;
};

export default App;
