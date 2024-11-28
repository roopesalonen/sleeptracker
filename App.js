import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { logoutAuth } from './components/Auth';
import Ionicons from '@expo/vector-icons/Ionicons';
import Tracker from './screens/Tracker';
import Data from './screens/Statistics';
import Login from './screens/Login';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the tab navigator's header
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Tracker') {
            iconName = 'analytics-outline';
          } else if (route.name === 'Statistics') {
            iconName = 'stats-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide tab labels
      })}
    >
      <Tab.Screen name="Tracker" component={Tracker} />
      <Tab.Screen name="Statistics" component={Data} />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => logoutAuth(navigation)}>
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          ),
        })}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Tabs} options={{ title: 'Sleep Tracker', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
