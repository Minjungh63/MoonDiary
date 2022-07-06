import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basic_theme } from '../theme';
const baseUrl = '127.0.0.1';

const LoginView = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  AsyncStorage.getItem(userId) //로그인확인
    .then(() => navigation.pagenate('BottomTabHome'))
    .catch((e) => console.log('로그인필요'));

  const submitLoginData = async () => {
    // const response = await axios.get(`${baseUrl}/login`, {// 서버통신
    //   userId: JSON.stringify(userId),
    //   password: JSON.stringify(password),
    // });
    // if (response.status == 200) {
    //   await AsyncStorage.setItem('userId', JSON.stringify(userId)); //로그인 정보 저장
    //   navigation.navigate('BottomTabHome');
    // }
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
      <Image source={require('front/assets/img/moon.png')} style={style.moon}></Image>
      <Image source={require('front/assets/img/cloud.png')} style={style.cloud}></Image>
      <Text style={style.text}>안녕하세요?</Text>
      <Text style={style.text}>저는 당신의 이야기를 좋아하는 달입니다.</Text>
      <Text style={style.text}>오늘 당신의 하루는 어땠는지 궁금해요.</Text>
      <View style={style.inputContainer}>
        <Text style={style.text}>ID를 입력해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="TeamI_IT23" onChangeText={setUserId}></TextInput>
        </View>
      </View>
      <View style={style.inputContainer}>
        <Text style={style.text}>비밀번호를 입력해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="SiliconValleyInternship2022" onChangeText={setPassword}></TextInput>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={submitLoginData} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.text}>{'로그인'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.text}>{'회원가입'}</Text>
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
  moon: {
    width: 120,
    height: 122,
    marginBottom: 20,
    marginTop: Dimensions.get('window').height / 8,
  },
  cloud: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.6,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  inputContainer: {
    marginTop: 15,
  },
  buttonContainer: {
    marginTop: 15,
  },
  inputBox: {
    maxWidth: 200,
    minWidth: 100,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    marginTop: 4,
  },
  buttonBox: {
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
});

export default LoginView;
