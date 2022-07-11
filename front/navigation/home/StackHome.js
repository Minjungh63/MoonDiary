import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../../pages/HomeView';

export default function StackHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeView" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeView" component={HomeView} />
      {/* 추후에 일기확인페이지 넣어야해서 냅뒀습니다 */}
    </Stack.Navigator>
  );
}
