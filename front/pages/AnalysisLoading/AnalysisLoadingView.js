import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import { useEffect, useState, useContext } from 'react';
import { axios_post } from '../../api/api';
import UserContext from '../../service/UserContext';
import styled from 'styled-components/native';
import { ModalWindow } from '../../components/ModalWindow';
import Toast from 'react-native-toast-message';

const AnalysisLoadingView = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [restart, setRestart] = useState(false);
  const [emotions, setEmotions] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState();
  const [severalEmotionModal, setSeveralEmotionModal] = useState(false);
  const [diaryId, setDiaryId] = useState('');
  const userContext = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        if (route.params.title) {
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
            setDiaryId(response.data.diaryId);
            setIsLoading(false);
            if (response.data.emotion.length === 1) {
              // 감정 분석이 완료됨
              getResult(response.data.emotion[0], response.data.diaryId);
            } else {
              // 감정 선택 모달창 띄우기
              setEmotions([...response.data.emotion]);
              setSeveralEmotionModal(true);
            }
          }
        } else {
          setIsLoading(false);
          setSelectedEmotion(route.params.selectedEmotion);
          setDiaryId(route.params.diaryId);
          setRestart(true);
        }
      } catch (e) {
        setIsLoading(false);
        setError(true);
      }
    })();
  }, []);
  const getResult = async (oneemotion = null, onediary = null) => {
    {
      restart && setRestart(false);
    }
    if (!route.params.imageYN && !route.params.commentYN) {
      // imageYN, commentYN이 모두 false => 결과 분석 페이지로 이동
      navigation.navigate('AnalysisResultView', {
        emotion: oneemotion !== null ? oneemotion : selectedEmotion,
        comment: null,
        drawingDiary: null,
      });
    } else {
      setSeveralEmotionModal(false);
      try {
        const response = await axios_post('selectEmotion', {
          userId: route.params.userId,
          diaryId: onediary !== null ? onediary : diaryId,
          emotion: oneemotion !== null ? oneemotion : selectedEmotion,
        });
        if (response.status === 201) {
          // 성공 toast 띄우기
          // toast를 누르면 AnalysisResultView 페이지로 이동하기
          // AnalysisResultView 페이지로 이동시, props로 emotion, comment, drawingDiary 넘겨주기
          Toast.show({
            type: 'success',
            text1: '일기 분석이 완료되었습니다 🎁',
            text2: '분석 결과를 보러 가볼까요?',
            onPress: () =>
              navigation.navigate('AnalysisResultView', {
                emotion: oneemotion !== null ? oneemotion : selectedEmotion,
                comment: response.data.comment,
                drawingDiary: response.data.image,
              }),
          });
        }
      } catch {
        // 실패
        Toast.show({
          type: 'error',
          text1: '일기 분석 과정에서 에러가 발생했습니다.',
          text2: '여기를 눌러 다시 시도해주세요.',
          onPress: () => {
            navigation.navigate('AnalysisLoadingView', {
              title: null,
              userId: route.params.userId,
              imageYN: route.params.imageYN,
              commentYN: route.params.commentYN,
              name: userContext.userName,
              month: route.params.month,
              day: route.params.day,
              selectedEmotion,
              diaryId,
            });
          },
        });
      }
    }
  };
  return (
    <View style={style.container}>
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
          오늘 하루도 수고 많았어요
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
            AI가 일기를 분석중입니다.
          </T>
        </View>
      ) : (
        <>
          <View style={style.loadingCommentContainer}>
            <T font={userContext.userFont} size={20}>
              {error ? '에러가 발생하였습니다.' : '감정 분석이 완료되었습니다'}
            </T>
          </View>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                (error && navigation.goBack()) ||
                  (restart && getResult(null, null)) ||
                  navigation.navigate('BottomTabHome');
              }}
              activeOpacity={0.7}
              style={style.buttonBox}
            >
              <T font={userContext.userFont} size={14}>
                {(error && '작성 페이지로 돌아가기') || (restart && '다시 요청하기') || '홈에서 결과 기다리기'}
              </T>
            </TouchableOpacity>
          </View>
        </>
      )}
      <ModalWindow
        open={severalEmotionModal}
        okPress={() => getResult(null, null)}
        text1="여러개의 감정이 느껴지시네요!"
        text2="오늘을 대표하는 감정 1개를 선택해주세요."
        emotions={emotions}
        setEmotion={setSelectedEmotion}
        confirmText="선택"
        font={userContext.userFont}
      />
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
const Container = styled.View`
  flex: ${(props) => props.flex};
  align-items: center;
  justify-contents: center;
`;
const style = StyleSheet.create({
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
  buttonBox: {
    backgroundColor: basic_theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 50,
    width: 150,
  },
});
export default AnalysisLoadingView;
