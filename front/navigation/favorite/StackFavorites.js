import { createStackNavigator } from '@react-navigation/stack';
import FavoriteView from '../../pages/FavoriteView';

export default function StackFavorites() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="FavoriteView" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteView" component={FavoriteView} />
    </Stack.Navigator>
  );
}
