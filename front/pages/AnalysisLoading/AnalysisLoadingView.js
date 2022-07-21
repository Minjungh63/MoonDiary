import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { axios_get, axios_post } from '../../api/api';
import { getEmotionRequire } from '../../service/SelectImage';

const AnalysisLoadingView = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState();

  useEffect(() => {
    (async () => {
      const diaryId = route.params.diaryId;
      const response = await axios_get('selectEmotion', { diaryId });
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

  const submitEmotionData = async (emotion) => {
    setSelectedEmotion(emotion);
    const response = await axios_post('selectEmotion', {
      userId: route.params.userId,
      diaryId: route.params.diaryId,
      emotion: emotion,
    });
    if (response.status == 201) {
      navigation.replace('AnalysisResultView', {
        diaryId: route.paramsdiaryId,
        userId: route.params.userId,
      });
    }
  };

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
                  source={getEmotionRequire(emotion)}
                  style={selectedEmotion === emotion ? null : style.emotion}
                ></Image>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => submitEmotionData(selectedEmotion)}>
          <Text style={style.text}>OK</Text>
        </TouchableOpacity>
      </Modal>
      <View style={style.dateBox}>
        <Text style={dateStyle}>
          {route.params.month} {route.params.day}
        </Text>
      </View>
      <View style={style.commentContainer}>
        <Text style={style.text}>{route.params.name}님,</Text>
        <Text style={style.text}>{'오늘 하루도 수고 많았어요'} </Text>
      </View>
      <View style={style.loadingContainer}>
        <Image source={require('../../assets/img/Loading.gif')} style={style.loadingImage} />
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
        <TouchableOpacity
          onPress={() => navigation.navigate('BottomTabHome')}
          activeOpacity={0.7}
          style={style.buttonBox}
        >
          <Text style={style.smallText}>{'홈에서 결과 기다리기'}</Text>
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
  dateBox: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flex: 0.2,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  commentContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCommentContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },

  buttonContainer: {
    flex: 0.25,
    justifyContent: 'center',
  },
  loadingImage: {
    width: Dimensions.get('window').width * 0.55,
    flex: 0.8,
  },
  text: {
    fontSize: 20,
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
  buttonBox: {
    backgroundColor: basic_theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 50,
    width: 150,
  },
  date: {
    fontSize: 22,
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
