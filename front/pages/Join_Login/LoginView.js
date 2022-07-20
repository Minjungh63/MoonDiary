import { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './styles';
import UserContext from '../../service/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios_post } from '../../api/api';

const LoginView = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const submitLoginData = async () => {
    //유저 로그인 시도
    if (!userId) {
      alert('아이디를 입력해주세요');
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
    }
    const response = await axios_post('login', { userId, password });
    if (response.status == 200) {
      //로그인 성공시
      AsyncStorage.setItem('userId', JSON.stringify(userId));
      // AsyncStorage는 자동로그인을 위함.
      // userContext.setUserName(userName); 사용자 이름 받아오기
      userContext.setUserId(JSON.stringify(userId));
      navigation.replace('BottomTabHome');
    }
  };

  useEffect(() => {
    if (userContext.userId !== '') {
      navigation.replace('BottomTabHome');
    }
  }, []);

  return (
    <View style={style.container}>
      <Image source={require('../../assets/img/moon.png')} style={style.moon}></Image>
      <Image source={require('../../assets/img/cloud.png')} style={style.cloud}></Image>
      <Text style={style.text}>안녕하세요?</Text>
      <Text style={style.text}>저는 당신의 이야기를 좋아하는 달입니다.</Text>
      <Text style={style.text}>오늘 당신의 하루는 어땠는지 궁금해요.</Text>
      <View style={style.inputContainer}>
        <Text style={style.text}>아이디를 입력해주세요.</Text>
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
        <TouchableOpacity onPress={() => navigation.replace('JoinView')} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.text}>{'회원가입'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginView;
