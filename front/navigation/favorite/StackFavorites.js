import { createStackNavigator } from '@react-navigation/stack';
import FavoriteView from '../../pages/Favorite/FavoriteView';
import ReadDiaryView from '../../pages/ReadDiary/ReadDiaryView';

export default function StackFavorites() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="FavoriteView" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteView" component={FavoriteView} />
      <Stack.Screen name="ReadDiaryView" component={ReadDiaryView} />
    </Stack.Navigator>
  );
}
