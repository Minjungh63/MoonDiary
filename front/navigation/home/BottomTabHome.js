import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackFavorites from './StackFavorites';
import StackHome from './StackHome';
import StackSettings from './StackSettings';
import StackStatistics from './StackStatistics';

export default function BottomTabHome() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="StackHome" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackHome" component={StackHome} />
      <Tab.Screen name="StackFavorites" component={StackFavorites} />
      <Tab.Screen name="StackStatistics" component={StackStatistics} />
      <Tab.Screen name="StackSettings" component={StackSettings} />
    </Tab.Navigator>
  );
}
