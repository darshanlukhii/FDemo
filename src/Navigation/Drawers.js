import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../Component/CustomDrawer';
import TabNavigation from './TabNavigation';

const Drawer = createDrawerNavigator();

function Drawers() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerPosition: 'left',
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          headerShown: false,
          headerTintColor: 'black',
        }}
      />
      {/* <Drawer.Screen name="Favourite" component={Favourite} />
      <Drawer.Screen name="Event" component={Event} />
      <Drawer.Screen name="Profile" component={Profile} /> */}
    </Drawer.Navigator>
  );
}

export default Drawers;
