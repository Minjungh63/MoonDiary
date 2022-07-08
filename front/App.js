import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabHome from './navigation/home/BottomTabHome';
import AnalysisLoadingView from './pages/AnalysisLoadingView';
import JoinView from './pages/JoinView';
import LoginView from './pages/LoginView';
import WriteDiaryView from './pages/WriteDiaryView';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        //폰트 불러오기코드 추가가능 (추후구현)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false }}>
        {/* initialRouteName: 이 Stack의 초기 view설정 */}
        <Stack.Screen name="LoginView" component={LoginView} />
        <Stack.Screen name="JoinView" component={JoinView} />
        <Stack.Screen name="BottomTabHome" component={BottomTabHome} />
        <Stack.Screen name="WriteDiaryView" component={WriteDiaryView} />
        <Stack.Screen name="AnalysisLoadingView" component={AnalysisLoadingView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
