import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import { useEffect, useState, useContext } from 'react';
import { axios_post } from '../../api/api';
import { getEmotionRequire } from '../../service/SelectImage';
import UserContext from '../../service/UserContext';
import styled from 'styled-components/native';
import { ModalWindow } from '../../components/ModalWindow';

const AnalysisLoadingView = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState();
  const [severalEmotionModal, setSeveralEmotionModal] = useState(false);
  const userContext = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios_post('write', {
          userId: route.params.userId,
          date: route.params.date,
          weather: route.params.weather,
          title: route.params.title,
          contents: route.params.contents,
          imageYN: route.params.imageYN,
          commentYN: route.params.commentYN,
        });
        if (response.status === 201) {
          setIsLoading(false);
          if (response.data.emotion.length === 1) {
            // 감정 분석이 완료됨
            setSelectedEmotion(response.data.emotion[0]);
            getResult();
          } else {
            // 감정 선택 모달창 띄우기
            setEmotions([...response.data.emotion]);
            setSeveralEmotionModal(true);
          }
        }
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    })();
  }, []);
  const getResult = async () => {
    if (!route.params.imageYN && !route.params.commentYN) {
      // imageYN, commentYN이 모두 false => 결과 분석 페이지로 이동
      navigation.navigate('AnalysisResultView', {
        emotion: selectedEmotion,
        comment: null,
        drawingDiary: null,
      });
    } else {
      const responseResult = await axios_post('selectEmotion', {
        userId: route.params.userId,
        diaryId: response.data.diaryId,
        emotion: response.data.emotion[0],
      });
      if (responseResult.status === 201) {
        // 성공 toast 띄우기
        // toast를 누르면 AnalysisResultView 페이지로 이동하기
        // AnalysisResultView 페이지로 이동시, props로 emotion, comment, drawingDiary 넘겨주기
      } else {
        // 실패 toast 띄우기
      }
    }
  };

  return (
    <View style={style.container}>
      <ModalWindow
        open={severalEmotionModal}
        okPress={getResult}
        text1="여러개의 감정이 느껴지시네요!"
        text2="오늘을 대표하는 감정 1개를 선택해주세요."
        imageList={
          <View style={style.emotionContainer}>
            {emotions.map((emotion) => (
              <TouchableOpacity onPress={() => setSelectedEmotion(emotion)} style={style.emotionBox}>
                <Image source={getEmotionRequire(emotion)} style={selectedEmotion === emotion && style.emotion}></Image>
              </TouchableOpacity>
            ))}
          </View>
        }
        confirmText="선택"
        font={userContext.userFont}
      />
      <View style={style.dateBox}>
        <T font={userContext.userFont} size={22}>
          {route.params.month} {route.params.day}
        </T>
      </View>
      <View style={style.commentContainer}>
        <T font={userContext.userFont} size={20}>
          {route.params.name}님,
        </T>
        <T font={userContext.userFont} size={20} paddingTop={3}>
          {'오늘 하루도 수고 많았어요'}{' '}
        </T>
      </View>
      <View style={style.loadingContainer}>
        <Image
          source={isLoading ? require('../../assets/img/loading.gif') : require('../../assets/img/loadingEnd.png')}
          style={style.loadingImage}
        />
      </View>
      {isLoading ? (
        <View style={style.loadingCommentContainer}>
          <T font={userContext.userFont} size={20}>
            {'AI가 일기를 분석중입니다.'}
          </T>
        </View>
      ) : (
        <>
          <View style={style.loadingCommentContainer}>
            <T font={userContext.userFont} size={20}>
              {error ? '에러가 발생하였습니다.' : '분석이 완료되었습니다'}
            </T>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={() => (error ? navigation.goBack() : navigation.navigate('BottomTabHome'))}
              activeOpacity={0.7}
              style={style.buttonBox}
            >
              <T font={userContext.userFont} size={14}>
                {error ? '작성 페이지로 돌아가기' : '홈에서 결과 기다리기'}
              </T>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
const T = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  color: white;
  padding-top: ${(props) => props.paddingTop || 0}px;
  margin-vertical: 2px;
`;
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
  emotion: { opacity: 0.5, resizeMode: 'contains' },
  selectedEmotion: {},

  emotionButtonBox: {},
});

const dateStyle = StyleSheet.compose(style.text, style.date);
export default AnalysisLoadingView;
