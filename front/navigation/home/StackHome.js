import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../../pages/Home/HomeView';
import ReadDiaryView from '../../pages/ReadDiary/ReadDiaryView';

export default function StackHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomeView" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="ReadDiaryView" component={ReadDiaryView} />
    </Stack.Navigator>
  );
}
