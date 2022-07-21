import { useState, useEffect, useContext } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from './styles';
import UserContext from '../../service/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios_post } from '../../api/api';
import { InputBox } from '../../components/InputBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ModalWindow } from '../../components/ModalWindow';
import { text } from '../../theme';

const LoginView = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const [loginModal, setLoginModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [invalidLoginModal, setInvalidLoginModal] = useState(false);
  const submitLoginData = async () => {
    //유저 로그인 시도
    if (!userId) {
      setLoginModal(true);
    } else if (!password) {
      setPasswordModal(true);
    } else {
      try {
        const response = await axios_post('login', { userId, password });
        if (response.status === 200) {
          //로그인 성공시
          AsyncStorage.setItem('userId', userId);
          // AsyncStorage는 자동로그인을 위함.
          // userContext.setUserName(userName); 사용자 이름 받아오기
          userContext.setUserId(userId);
          navigation.replace('BottomTabHome');
        }
      } catch {
        setInvalidLoginModal(true);
      }
    }
  };
  const autoLogin = async () => {
    //자동로그인
    const response = await axios_post('login', { userId });
    if (response.status === 200) {
      userContext.setUserId(response.data.userId);
      userContext.setUserName(response.data.userName);
      userContext.setImageYN(response.data.imageYN);
      userContext.setCommentYN(response.data.commentYN);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('userId').then((value) => {
      if (value !== null) {
        // autoLogin(); 백엔드와 협업 필요
        userContext.setUserId(value); //autoLogin 사용시 지울 것
        navigation.replace('BottomTabHome');
      }
    });
  }, []);

  return (
    <KeyboardAwareScrollView contentContainerStyle={style.container} scrollEnabled={false}>
      <View style={style.moonContainer}>
        <Image source={require('../../assets/img/moon.png')} style={style.moon}></Image>
      </View>
      <Image source={require('../../assets/img/cloud.png')} style={style.cloud}></Image>
      <View style={style.headerContainer}>
        <Text style={style.text}>{text.intro}?</Text>
        <Text style={style.text}>{text.moon_intro}</Text>
        <Text style={style.text}>오늘 당신의 하루는 어땠는지 궁금해요.</Text>
      </View>
      <View style={style.inputContainer}>
        <InputBox text={text.id} value={userId} placeholder="ID" onChangeText={setUserId} />
        <InputBox text={text.pwd} value={password} placeholder="Password" onChangeText={setPassword} />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={submitLoginData} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'로그인'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('JoinView')} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'회원가입'}</Text>
        </TouchableOpacity>
      </View>
      <ModalWindow open={loginModal} okPress={() => setLoginModal(false)} text2={text.id} confirmText={text.backText} />
      <ModalWindow
        open={passwordModal}
        okPress={() => setPasswordModal(false)}
        text2={text.pwd}
        confirmText={text.backText}
      />
      <ModalWindow
        open={invalidLoginModal}
        okPress={() => setInvalidLoginModal(false)}
        text1="잘못된 로그인 정보입니다."
        text2="다시 입력해주세요."
        confirmText={text.backText}
      />
    </KeyboardAwareScrollView>
  );
};

export default LoginView;
