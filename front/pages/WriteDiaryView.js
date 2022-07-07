import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Button, Keyboard } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basic_theme } from '../theme';
const baseUrl = 'http://127.0.0.1:8000';
const loginUrl = '/user/login';

const WriteDiaryView = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  navigation.setOptions({
    tabBarStyl: { display: 'none' },
  });

  AsyncStorage.getItem(userId) //로그인확인
    .then(() => navigation.pagenate('BottomTabHome'))
    .catch((e) => console.log('로그인필요'));

  const submitLoginData = async () => {
    const response = await axios.post(
      `${baseUrl}${loginUrl}`,
      {
        // 서버통신
        userId: JSON.stringify(userId),
        password: JSON.stringify(password),
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
      }
    );
    if (response.status == 200) {
      await AsyncStorage.setItem('userId', JSON.stringify(userId)); //로그인 정보 저장
      navigation.navigate('BottomTabHome');
    }
  };
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.homeBox}>
        <Image source={require('../assets/img/home.png')} style={style.home}></Image>
      </TouchableOpacity>
      <View style={style.dateBox}>
        <Text style={dateStyle}>
          {'June 22'}
          {/*date*/}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.weatherConatiner}>
          <Text style={style.boldText}>오늘의 날씨 </Text>
          <TouchableOpacity style={style.weatherBox}>
            <Image source={require('../assets/img/sunny.png')} style={style.weather}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={style.weatherBox}>
            <Image source={require('../assets/img/cloudy.png')} style={style.weather}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={style.weatherBox}>
            <Image source={require('../assets/img/rainy.png')} style={style.weather}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={style.weatherBox}>
            <Image source={require('../assets/img/stormy.png')} style={style.weather}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={style.weatherBox}>
            <Image source={require('../assets/img/hot.png')} style={style.weather}></Image>
          </TouchableOpacity>
        </View>

        <View style={style.questionContainer}>
          <Image source={require('../assets/img/moon.png')} style={style.smallMoon}></Image>
          <View style={style.questionBox}>
            <Text style={style.text}>
              {/**name */}
              {'홍길동님'}
            </Text>
            <Text style={style.boldText}>{'오늘의 하루는 어땠는지 알려주세요.'}</Text>
          </View>
        </View>

        <View style={style.titleContainer}>
          <Text style={style.boldText}>제목</Text>
          <View style={style.titleInputBox}>
            <TextInput placeholder="제목을 입력해주세요" onChangeText={setPassword}></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={style.contentContainer}>
        <TextInput multiline={true} placeholder={'내용을 작성해주세요'} style={style.contentInput}></TextInput>
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'작성 취소'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={style.subButtonBox}>
          <Text style={style.smallText}>{'작성 완료'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 2,
  },

  buttonBox: {
    marginHorizontal: 12,
    height: 40,
    width: 100,
    borderWidth: 2,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    borderRadius: 100,
    marginTop: 10,
  },
  subButtonBox: {
    marginHorizontal: 12,
    height: 40,
    width: 100,
    borderWidth: 2,
    backgroundColor: basic_theme.subColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.subColor,
    borderRadius: 100,
    marginTop: 10,
  },
  date: {
    fontSize: 30,
    height: 35,
  },
  dateBox: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    // shadowColor: '#000', //그림자 설정
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 4,
    // },
  },
  home: {
    width: 35,
    height: 35,
  },
  homeBox: {
    marginTop: Dimensions.get('window').height / 18,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'flex-end',
    height: 35,
  },
  weatherConatiner: {
    fontWeight: '800',
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.25,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  weatherBox: {
    margin: 4,
    width: 26,
    height: 26,
    alignItems: 'center',
  },
  weather: {
    width: 26,
    height: 26,
  },
  smallMoon: {
    width: 50,
    height: 50,
  },
  questionContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width / 1.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionBox: {
    margin: 5,
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.25,
  },

  titleInputBox: {
    marginTop: 3,
    flex: 0.98,
    fontSize: 17,
    marginLeft: 15,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'Gowun_Batang',
  },
  contentContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#0000006b',
    backgroundColor: basic_theme.fgColor,
    height: Dimensions.get('window').height / 2.0,
    width: Dimensions.get('window').width / 1.25,
  },
  contentInput: {
    flex: 1,
    height: 1000,
    padding: 8,
  },
});

const dateStyle = StyleSheet.compose(style.text, style.date);

export default WriteDiaryView;
