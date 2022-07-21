import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import { axios_get } from '../../api/api';
import { getEmtionRequire } from '../../service/SelectImage';

const getEmotionText = {
  joy: '오늘은 행복한 하루였군요!',
  love: '당신의 하루에서 사랑이 느껴지네요.',
  surprise: '오늘은 놀라운 일이 있었군요.',
  anger: '오늘은 화가 많이 났던 하루였군요.',
  sadness: '오늘은 조금 슬픈 하루였군요.',
  fear: '오늘은 조금 무서웠던 일이 있었군요.',
  neutral: '당신의 하루에서 평온함이 느껴지네요.',
  tired: '오늘은 조금 지치는 하루였군요.',
};

const AnalysisResultView = ({ navigation, route }) => {
  const [emotion, setEmotion] = useState('joy'); //테스트 하려고 joy 넣어둠
  const [imagePath, setImagePath] = useState('');
  const [comment, setComment] = useState('');
  const [isLikeIt, setIsLikeIt] = useState('');

  useEffect(() => {
    (async () => {
      const userId = route.params.userId;
      const diaryId = route.params.diaryId;
      const response = await axios_get('result', { userId, diaryId });
      if (response.status == 200) {
        setEmotion(response.data.emotion);
        setImagePath(response.data.image);
        setComment(response.data.comment);
      }
    })();
  }, []);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <Image source={require('../../assets/img/home.png')} style={style.home}></Image>
      </TouchableOpacity>
      <View style={style.speechBubbleContainer}>
        <Image source={require('../../assets/img/speech-bubble.png')} style={style.speechBubbleImage}></Image>
        <View style={style.speechBubbleBox}>
          <View style={style.textBox}>
            <Text style={style.blackText}>{'홍길동 ' /**name */}님,</Text>
            <Text style={style.blackText}>{getEmotionText[emotion]}</Text>
          </View>
          <Image source={getEmtionRequire(emotion)} style={style.emotion}></Image>
          <View style={style.textBox}>
            <Text style={style.blackText}>{comment}</Text>
          </View>
          <View style={style.textBox}>
            <Text style={style.blackText}>제가 {/*name*/}님의 하루를</Text>
            <Text style={style.blackText}>{'그림일기로 표현해봤어요.'}</Text>
          </View>
        </View>
      </View>
      <View style={style.moonContainer}>
        <Image source={require(`../../assets/img/moon.png`)} style={style.moon}></Image>
      </View>
      <View style={style.paintingDiaryContainer}>
        <Image source={imagePath} style={style.paintingDiaryImage}></Image>
      </View>
      <View style={style.resultContainer}>
        <View style={style.resultBox}>
          <Text style={style.text}>결과가 마음에 드시나요?</Text>
          <View style={style.buttonContainer}>
            <TouchableOpacity onPress={() => setIsLikeIt('yes')} activeOpacity={0.7} style={style.buttonBox}>
              <Text style={isLikeIt === 'yes' ? style.opacitySmallText : style.smallText}>{'예'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLikeIt('no')} activeOpacity={0.7} style={style.buttonBox}>
              <Text style={isLikeIt === 'no' ? style.opacitySmallText : style.smallText}>{'아니오'}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  opacitySmallText: {
    fontSize: 14,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
    opacity: 0.5,
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

  speechBubbleContainer: {
    marginTop: 20,
    width: Dimensions.get('window').width / 1.1,
    alignItems: 'center',
    height: Dimensions.get('window').height / 3.15,
    position: 'relative',
  },
  speechBubbleBox: {
    alignItems: 'center',
  },
  speechBubbleImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'stretch',
  },
  paintingDiaryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  blackText: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'black',
    marginVertical: 2,
    textAlign: 'center',
  },
  emotion: {
    width: 35,
    height: 35,
  },
  moon: {
    width: 65,
    height: 65,
  },
  textBox: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 5,
  },
  moonContainer: {
    width: Dimensions.get('window').width / 1.2,
  },
  paintingDiaryContainer: {
    marginTop: 30,
    backgroundColor: '#fff', // TODO 일기 받아오면 없애기
    width: Dimensions.get('window').width / 1.1,
    height: Dimensions.get('window').height / 3.8,
    borderRadius: 32,
  },
  resultContainer: {
    height: '11%',
    justifyContent: 'flex-end',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },

  buttonBox: {
    marginHorizontal: 4,
    height: 40,
    width: 50,
    borderWidth: 2,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    borderRadius: 100,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AnalysisResultView;
