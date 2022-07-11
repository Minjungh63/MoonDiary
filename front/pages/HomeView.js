import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { basic_theme } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../components/Calendar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://127.0.0.1:8000';
const diaryUrl = '/diary';

const HomeView = ({ navigation }) => {
  const { userName, setUserName } = useState('홍길동'); //사용자 로그인시 state 관리 필요할 코드
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
  const getDiaryData = async () => {
    const userId = AsyncStorage.getItem(userId);
    const response = await axios
      .post(`${baseUrl}${diaryUrl}`, {
        userId: userId, //userId 전송
      })
      .then((res) => {
        console.log(res); //결과 받아서 Calendar 컴포넌트에 넘겨야함
      })
      .catch((error) => console.error(error));
  };
  const goWrite = () => {
    navigation.replace('WriteDiaryView');
  };
  useEffect(() => {
    getDiaryData();
    setUserName(AsyncStorage.getItem('userName'));
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.text, marginTop: 40 }}>안녕하세요 {userName}님?</Text>
        <Text style={styles.text}>오늘하루는 어떠셨나요?</Text>
      </View>
      <Calendar />
      <View style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={goWrite}>
          <FontAwesome5 name="pen" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Gowun_Batang',
  },
  button: {
    margin: 20,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 30,
    borderRadius: 35,
  },
});

export default HomeView;
