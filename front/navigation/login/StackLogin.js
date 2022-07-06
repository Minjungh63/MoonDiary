import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from '../../pages/LoginView';
import BottomTabHome from '../home/BottomTabHome';

export default function StackLogin() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginView">
        {/* initialRouteName: 이 Stack의 초기 view설정 */}
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="BottomTabHome" component={BottomTabHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
