import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../../pages/HomeView';

export default function StackHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeView">
      <Stack.Screen name="HomeView" component={HomeView} />
    </Stack.Navigator>
  );
}
