import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackHome from './StackHome';
import StatisticsView from '../../pages/Statistics/StatisticsView';
import StackFavorites from '../favorite/StackFavorites';
import SettingsView from '../../pages/Setting/SettingsView';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { basic_theme } from '../../theme';

export default function BottomTabHome() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="StackHome"
      screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: basic_theme.btnColor2, height: 60 } }}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen
        name="StackHome"
        component={StackHome}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="ios-home" size={28} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="StackFavorites"
        component={StackFavorites}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="ios-star" size={30} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="StatisticsView"
        component={StatisticsView}
        options={{
          tabBarIcon: () => {
            return <Entypo name="bar-graph" size={28} color="white" />;
          },
        }}
      />
      <Tab.Screen
        name="SettingsView"
        component={SettingsView}
        options={{
          tabBarIcon: () => {
            return <Ionicons name="ios-settings" size={28} color="white" />;
          },
        }}
      />
      {/* 다음페이지가 없으므로 바로 View로 전달해도 됨 */}
    </Tab.Navigator>
  );
}
