import { useContext, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './styles';
import { axios_post } from '../../api/api';
import UserContext from '../../service/UserContext';
import { ModalWindow } from '../../components/ModalWindow';
import { InputBox } from '../../components/InputBox';
import { text } from '../../theme';

const JoinView = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const [nameModal, setNameModal] = useState(false);
  const [idModal, setIdModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [checkIdModal, setCheckIdModal] = useState(false);
  const submitJoinData = async () => {
    if (!name) {
      setNameModal(true);
    } else if (!userId) {
      setIdModal(true);
    } else if (!password) {
      setPasswordModal(true);
    } else {
      const response = await axios_post('join', { userId, name, password });
      console.log(response);
      if (response.status == 201) {
        await AsyncStorage.setItem('userId', JSON.stringify(userId)); //로그인 정보 저장
        userContext.setName(name);
        userContext.setUserId(userId);
        //로그인와 마찬가지로 Context 세팅필요
        navigation.navigate('BottomTabHome');
      } else if (response.status == 409) {
        //이미 있는아이디일때
        setCheckIdModal(true);
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.moonContainer}>
        <Image source={require('../../assets/img/moon.png')} style={style.moon}></Image>
      </View>
      <Image source={require('../../assets/img/cloud.png')} style={style.cloud}></Image>
      <View style={style.heatherContainer}>
        <Text style={style.text}>{text.intro}?</Text>
        <Text style={style.text}>{text.moon_intro}</Text>
      </View>
      <View style={style.inputContainer}>
        <InputBox text="당신의 이름은 무엇인가요?" value={name} placeholder="이름" onChangeText={setName} />
        <InputBox text="아이디를 설정해주세요." value={userId} placeholder="ID" onChangeText={setUserId} />
        <InputBox text="비밀번호를 설정해주세요." value={password} placeholder="Password" onChangeText={setPassword} />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={submitJoinData} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>시작하기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginView')} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{text.backText}</Text>
        </TouchableOpacity>
      </View>
      <ModalWindow
        open={nameModal}
        text2="이름을 입력해주세요."
        okPress={() => setNameModal(false)}
        confirmText={text.backText}
      />
      <ModalWindow open={idModal} text2={text.id} okPress={() => setIdModal(false)} confirmText={text.backText} />
      <ModalWindow
        open={passwordModal}
        text2={text.pwd}
        okPress={() => setPasswordModal(false)}
        confirmText={text.backText}
      />
      <ModalWindow
        open={checkIdModal}
        text1="이미 존재하는 아이디입니다."
        text2={'다른 ' + text.id}
        okPress={() => setCheckIdModal(false)}
        confirmText={text.backText}
      />
    </View>
  );
};

export default JoinView;
