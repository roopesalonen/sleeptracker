import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tracker from './screens/Tracker';
import Data from './screens/Data';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tracker') {
            iconName = 'analytics-outline';
          } else if (route.name === 'Data') {
            iconName = 'stats-chart-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, //hides tab names
      })}>
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Data" component={Data} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
