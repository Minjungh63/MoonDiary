import { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import { axios_post } from '../../api/api';
import { getWeatherRequire } from '../../service/SelectImage';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../../service/UserContext';
import { ModalWindow } from '../../components/ModalWindow';
const WriteDiaryView = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const YEAR = new Date().getFullYear(); // 현재 연도
  const MONTH = new Date().getMonth(); // 현재 월
  const DAY = new Date().getDate(); // 현재 일
  const DATE = YEAR + '-' + MONTH + '-' + DAY;
  const confirmText = '네';
  const deniedText = '아니오';
  const backText = '돌아가기';
  const weather_list = ['sunny', 'cloudy', 'rainy', 'stormy', 'little_cloudy', 'snowy'];
  const [weather, setWeather] = useState('sunny');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [goAnalysisModal, setGoAnalysisModal] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  useEffect(() => {
    setTitle('');
    setContents('');
  }, []);
  const goAnalysis = async () => {
    const userId = userContext.userId;
    const userName = userContext.userName;
    const TITLE = title.trim();
    const CONTENTS = contents.trim();
    setGoAnalysisModal(false);
    const response = await axios_post('write', {
      userId: userId,
      date: DATE,
      weather: weather,
      title: TITLE,
      contents: CONTENTS,
    });
    if (response.status == 201) {
      navigation.navigate('AnalysisLoadingView', {
        userId: userId,
        diaryId: response.data.diaryId,
        month: month[MONTH],
        day: DAY,
        name: userName,
      });
    }
  };
  const submitDiaryData = () => {
    //제목을 작성하지 않은 경우
    if (!title.trim()) {
      setTitleModal(true);
    }
    //일기를 3문장 이상 작성하지 않은 경우
    else if (contents.split('.' || '?' || '!').filter((sents) => sents.trim() !== '').length < 3) {
      setContentModal(true);
    } else {
      setGoAnalysisModal(true);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={style.container} scrollEnabled={false}>
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="home" size={35} color="white" />
        </TouchableOpacity>
        <Text style={style.date}>
          {month[MONTH]} {DAY}
        </Text>
      </View>
      <View style={style.weatherConatiner}>
        <Text style={style.text}>오늘의 날씨 </Text>
        {weather_list.map((weather_txt, index) => (
          <TouchableOpacity onPress={() => setWeather(weather_txt)} style={style.weatherIMG} key={index}>
            <Image
              source={getWeatherRequire(weather_txt)}
              style={weather == weather_txt ? style.weatherSelected : style.weatherNotSelected}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
      <View style={style.questionContainer}>
        <Image source={require('../../assets/img/moon.png')} style={style.smallMoon}></Image>
        <View style={style.questionBox}>
          <Text style={style.text}>{userContext.userName}님,</Text>
          <Text style={style.text}>오늘의 하루는 어땠는지 알려주세요.</Text>
        </View>
      </View>
      <View style={style.titleContainer}>
        <Text style={style.text}>제목</Text>
        <TextInput placeholder="제목을 입력해주세요" onChangeText={setTitle} style={style.titleInputBox}></TextInput>
      </View>
      <TextInput
        multiline={true}
        placeholder={'내용을 작성해주세요'}
        onChangeText={setContents}
        style={style.contentContainer}
      ></TextInput>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => setCancelModal(true)} activeOpacity={0.7} style={style.button1}>
          <Text style={style.buttonText}>{'작성 취소'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitDiaryData} activeOpacity={0.7} style={style.button2}>
          <Text style={style.buttonText}>{'작성 완료'}</Text>
        </TouchableOpacity>
      </View>
      <ModalWindow
        open={titleModal}
        okPress={() => setTitleModal(false)}
        text1="앗! 아직 제목이 작성되지 않았네요."
        text2="제목을 작성해주세요."
        confirmText={backText}
      />
      <ModalWindow
        open={contentModal}
        okPress={() => setContentModal(false)}
        cancelPress={() => {
          setContentModal(false);
          setTipModal(true);
        }}
        text1="앗! 3문장 이상 작성해주셔야"
        text2="제가 일기를 분석할 수 있어요."
        confirmText={backText}
        cancelText="Tip"
      />
      <ModalWindow
        open={cancelModal}
        okPress={() => navigation.goBack()}
        cancelPress={() => setCancelModal(false)}
        text1="작성하신 일기가 모두 사라집니다."
        text2="작성을 취소하시겠습니까?"
        confirmText={confirmText}
        cancelText={deniedText}
      />
      <ModalWindow
        open={goAnalysisModal}
        okPress={goAnalysis}
        cancelPress={() => setGoAnalysisModal(false)}
        text2="일기를 모두 작성하셨나요?"
        confirmText={confirmText}
        cancelText={deniedText}
      />
      <ModalWindow
        open={tipModal}
        okPress={() => setTipModal(false)}
        title=" ✨ TIP ✨"
        text1="문장의 끝에 . 또는 ! 또는 ?을 적으면"
        text2="문장으로 인식됩니다."
        confirmText={backText}
      />
    </KeyboardAwareScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: basic_theme.bgColor,
    padding: 25,
  },
  headerContainer: {
    height: 60,
    width: Dimensions.get('window').width - 50,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  weatherConatiner: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  questionContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    height: Dimensions.get('window').height - 340,
    width: Dimensions.get('window').width - 50,
    textAlignVertical: 'top',
    color: basic_theme.darkBlue,
    fontFamily: 'Gowun_Batang',
    fontSize: 17,
    borderWidth: 1,
    borderColor: basic_theme.blue,
    backgroundColor: basic_theme.fgColor,
    marginVertical: 10,
    padding: 20,
  },
  buttonContainer: {
    height: 45,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  button1: {
    backgroundColor: basic_theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flex: 1,
    width: 100,
  },
  button2: {
    backgroundColor: basic_theme.subColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flex: 1,
    width: 100,
  },
  date: {
    alignSelf: 'center',
    fontSize: 22,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  weatherIMG: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherSelected: {
    width: 35,
    height: 35,
  },
  weatherNotSelected: {
    width: 26,
    height: 26,
    opacity: 0.5,
  },
  smallMoon: {
    width: 30,
    height: 30,
  },

  questionBox: {
    marginLeft: 15,
  },

  titleInputBox: {
    fontSize: 17,
    marginLeft: 15,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'Gowun_Batang',
    flex: 1,
  },
});

export default WriteDiaryView;
