import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabHome from './navigation/home/BottomTabHome';
import AnalysisLoadingView from './pages/AnalysisLoading/AnalysisLoadingView';
import JoinView from './pages/Join_Login/JoinView';
import LoginView from './pages/Join_Login/LoginView';
import WriteDiaryView from './pages/WriteDiary/WriteDiaryView';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import AnalysisResultView from './pages/AnalysisResult/AnalysisResultView';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import UserContext from './service/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('Anonymous');
  const user = {
    userId,
    userName,
    setUserId,
    setUserName,
  };
  let myFont = {
    Gowun_Batang: require('./assets/fonts/GowunBatang-Regular.ttf'),
  };
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(myFont);
        AsyncStorage.getItem('userId').then((value) => {
          //자동로그인을 위함
          setUserId(value);
        });
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
    return <AppLoading />;
  }
  const Stack = createStackNavigator();
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false }}>
          {/* initialRouteName: 이 Stack의 초기 view설정 */}
          <Stack.Screen name="LoginView" component={LoginView} />
          <Stack.Screen name="JoinView" component={JoinView} />
          <Stack.Screen name="BottomTabHome" component={BottomTabHome} />
          <Stack.Screen name="WriteDiaryView" component={WriteDiaryView} />
          <Stack.Screen name="AnalysisLoadingView" component={AnalysisLoadingView} />
          <Stack.Screen name="AnalysisResultView" component={AnalysisResultView} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
