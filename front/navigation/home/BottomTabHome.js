import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackHome from './StackHome';
import StatisticsView from '../../pages/Statistics/StatisticsView';
import StackFavorites from '../favorite/StackFavorites';
import SettingsView from '../../pages/Setting/SettingsView';

export default function BottomTabHome() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="StackHome" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="StackHome" component={StackHome} />
      <Tab.Screen name="StackFavorites" component={StackFavorites} />
      <Tab.Screen name="StatisticsView" component={StatisticsView} />
      <Tab.Screen name="SettingsView" component={SettingsView} />
      {/* 다음페이지가 없으므로 바로 View로 전달해도 됨 */}
    </Tab.Navigator>
  );
}
