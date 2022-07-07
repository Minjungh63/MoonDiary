import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './pages/LoginView';
import BottomTabHome from './navigation/home/BottomTabHome';

export default function App() {
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {setLoading(true)}, 2000);
  // })
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginView">
        {/* initialRouteName: 이 Stack의 초기 view설정 */}
        <Stack.Screen name="LoginView" component={LoginView} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabHome" component={BottomTabHome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
