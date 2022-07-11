import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
const baseUrl = 'http://127.0.0.1:8000';
const selectEmotionUrl = '/diary/write/mood';

const AnalysisLoadingView = ({ navigation, diaryId }) => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emotions, setEmotions] = useState(['angry', 'joy', 'love']);
  const [selectedEmotion, setSelectedEmotion] = useState();

  AsyncStorage.getItem('userId') //로그인확인
    .then((value) => setUserId(value))
    .catch((e) => navigation.replace('LoginView'));

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        //감정분석결과 요청
        `${baseUrl}${selectEmotionUrl}`,
        {
          userId: userId,
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      );
      if (response.status == 200) {
        if (response.data.emotions.length == 1) {
          submitEmotionData(emotions[0]);
          return;
        }
        //감정이 여러개일때
        setIsLoading(false);
        setEmotions([...response.data.emotions]); //감정 받아오기
      }
    })();
  }, []);

  const getEmotionPath = (emotion) => {
    //require에는 `${data}가 안되기때문에 선언
    switch (emotion) {
      case 'angry':
        return require(`../assets/img/emotion/angry.png`);
      case 'joy':
        return require(`../assets/img/emotion/joy.png`);
      case 'love':
        return require(`../assets/img/emotion/love.png`);
      case 'sad':
        return require(`../assets/img/emotion/sad.png`);
      case 'surprised':
        return require(`../assets/img/emotion/surprised.png`);
      case 'tired':
        return require(`../assets/img/emotion/tired.png`);
    }
  };
  const submitEmotionData = async (emotion) => {
    setSelectedEmotion(emotion);
    const response = await axios.post(
      `${baseUrl}${selectEmotionUrl}`,
      {
        // 서버통신
        userId: userId,
        diaryId: diaryId,
        emotion: emotion,
      },
      {
        headers: {
          'Content-Type': `application/json`,
        },
      }
    );
    if (response.status == 201) {
      navigation.replace('AnalysisResultView', {
        diaryId: {
          /**diaryId reponse 받은 diaryId */
        },
      });
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
      <Modal backdropOpacity={0} isVisible={!isLoading} style={style.modalContainer}>
        <View style={style.modalBox}>
          <Text style={style.text}>여러개의 감정이 느껴지시네요!</Text>
          <Text style={style.text}>오늘을 대표하는 감정 1개를 선택해주세요.</Text>
          <View style={style.emotionContainer}>
            {emotions.map((emotion) => (
              <TouchableOpacity onPress={() => setSelectedEmotion(emotion)} style={style.emotionBox}>
                <Image
                  source={getEmotionPath(emotion)}
                  style={selectedEmotion == emotion ? style.selectedEmotion : style.emotion}
                ></Image>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => submitEmotionData(selectedEmotion)} style={style.emotionButtonBox}>
          <Text style={style.text}>OK</Text>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <Image source={'../assets/img/home.png'} style={style.home}></Image>
      </TouchableOpacity>
      <View style={style.dateBox}>
        <Text style={dateStyle}>
          {'June 22'}
          {/*date*/}
        </Text>
      </View>
      <View style={style.commentContainer}>
        <Text style={style.boldText}>
          {/**username */}
          {'홍길동님,'}
        </Text>
        <Text style={style.boldText}>{'오늘 하루도 수고 많았어요'} </Text>
      </View>
      <View style={style.loadingContainer}>
        <Image source={require('../assets/img/loading.gif')} style={style.loading}></Image>
      </View>
      {isLoading ? (
        <View style={style.loadingCommentContainer}>
          <Text style={style.text}>{'AI가 일기를 분석중입니다.'}</Text>
        </View>
      ) : (
        <View style={style.loadingCommentContainer}>
          <Text style={style.text}>{'분석이 완료되었습니다'}</Text>
        </View>
      )}

      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'수정하기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
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
    position: 'absolute',
    bottom: 120,
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

  date: {
    fontSize: 22,
    height: 27,
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
  commentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    marginTop: 70,
    height: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width / 1.7,
  },

  loadingCommentContainer: {
    marginTop: 40,
  },
  loading: {
    height: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width / 1.7,
  },
  modalContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.05,
    height: Dimensions.get('window').height / 3,
    top: Dimensions.get('window').height / 3.8,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#303B62',
    alignItems: 'center',
  },
  modalBox: {
    alignItems: 'center',
  },

  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emotionBox: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 15,
  },
  emotion: { opacity: 0.5 },
  selectedEmotion: {},

  emotionButtonBox: {},
});

const dateStyle = StyleSheet.compose(style.text, style.date);
export default AnalysisLoadingView;
