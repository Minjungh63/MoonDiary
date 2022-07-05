import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const StackStatistics = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName=""></Stack.Navigator>
    </NavigationContainer>
  );
};
export default StackStatistics;
