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
    </Drawer.Navigator>
  );
}

export default Drawers;