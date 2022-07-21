import { useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styles';
import { axios_post } from '../../api/api';

const JoinView = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const submitJoinData = async () => {
    if (!name) {
      alert('이름을 입력해주세요');
    } else if (!userId) {
      alert('아이디를 입력해주세요');
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
    }
    const response = await axios_post('join', { userId, name, password });
    if (response.status == 201) {
      await AsyncStorage.setItem('userId', JSON.stringify(userId)); //로그인 정보 저장
      //로그인와 마찬가지로 Context 세팅필요
      navigation.replace('BottomTabHome');
    } else if (response.status == 409) {
      //이미 있는아이디일때
      alert('이미 가입된 아이디입니다.');
    }
  };

  return (
    <View style={style.container}>
      <Image source={require('../../assets/img/moon.png')} style={style.moon}></Image>
      <Image source={require('../../assets/img/cloud.png')} style={style.cloud}></Image>
      <Text style={style.text}>안녕하세요?</Text>
      <Text style={style.text}>저는 당신의 이야기를 좋아하는 달입니다.</Text>
      <View style={style.inputContainer}>
        <Text style={style.text}>당신의 이름은 무엇인가요?</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="홍길동" onChangeText={setName}></TextInput>
        </View>
      </View>
      <View style={style.inputContainer}>
        <Text style={style.text}>ID를 설정해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="TeamI_IT23" onChangeText={setUserId}></TextInput>
        </View>
      </View>
      <View style={style.inputContainer}>
        <Text style={style.text}>비밀번호를 설정해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="SiliconValleyInternship2022" onChangeText={setPassword}></TextInput>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={submitJoinData} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.text}>{'시작하기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinView;
