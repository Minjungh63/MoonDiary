import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackHome from './StackHome';
import StackStatistics from '../statistics/StackStatistics';
import StackFavorites from '../favorite/StackFavorites';
import StackSettings from '../setting/StackSettings';

export default function BottomTabHome() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="StackHome" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackHome" component={StackHome} />
      <Tab.Screen name="StackFavorites" component={StackFavorites} />
      <Tab.Screen name="StackStatistics" component={StackStatistics} />
      <Tab.Screen name="StackSettings" component={StackSettings} />
      {/* 다음페이지가 없으므로 바로 View로 전달해도 됨 */}
    </Tab.Navigator>
  );
}
