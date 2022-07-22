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
import UserContext from './service/UserContext';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('Anonymous');
  const [userFont, setUserFont] = useState('Gowun_Batang'); //폰트선택
  const [imageYN, setImageYN] = useState(true); //AI 그림일기 받는지 여부
  const [commentYN, setCommentYN] = useState(true); //AI 코멘트 받는지 여부
  const user = {
    userId,
    userName,
    userFont,
    imageYN,
    commentYN,
    setUserId,
    setUserName,
    setUserFont,
    setImageYN,
    setCommentYN,
  };
  let myFont = {
    Gowun_Batang: require('./assets/fonts/GowunBatang-Regular.ttf'),
    // Nanum_Gothic: 'https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Nanum+Gothic&display=swap',
    // Nanum_Myeongjo: 'https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Nanum+Myeongjo&display=swap',
  };
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(myFont);
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
    <UserContext.Provider value={user}>
      <NavigationContainer onReady={onLayoutRootView}>
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
