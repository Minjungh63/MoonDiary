import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../../pages/HomeView';
import WriteDiaryView from '../../pages/WriteDiaryView';

export default function StackHome() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="WriteDiaryView" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="WriteDiaryView" component={WriteDiaryView} />
    </Stack.Navigator>
  );
}
