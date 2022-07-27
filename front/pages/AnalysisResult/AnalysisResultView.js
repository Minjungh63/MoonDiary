import { useContext, useState } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme, getEmotionText, text } from '../../theme';
import { getEmotionRequire } from '../../service/SelectImage';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../../service/UserContext';
import styled, { css } from 'styled-components/native';

const AnalysisResultView = ({ navigation, route }) => {
  const [isLikeIt, setIsLikeIt] = useState('');
  const emotion = route.params.emotion;
  const comment = route.params.comment;
  const drawingDiary = route.params.drawingDiary;
  const userName = useContext(UserContext).userName;

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <MaterialIcons name="home" size={35} color="white" />
      </TouchableOpacity>
      <View style={style.speechBubbleContainer}>
        <Image source={require('../../assets/img/speech-bubble.png')} style={style.speechBubbleImage}></Image>
        <View style={style.speechBubbleBox}>
          <View style={style.textBox}>
            <T size={17} font={useContext(UserContext).userFont} black={true}>
              {userName}님,
            </T>
            <T size={17} font={useContext(UserContext).userFont} black={true}>
              {getEmotionText[emotion]}
            </T>
          </View>
          <Image source={getEmotionRequire(emotion)} style={style.emotion}></Image>
          {{ comment } && (
            <View style={style.textBox}>
              <T size={17} font={useContext(UserContext).userFont} black={true}>
                {comment}
              </T>
            </View>
          )}
          {{ drawingDiary } && (
            <View style={style.textBox}>
              <T size={17} font={useContext(UserContext).userFont} black={true}>
                제가 {userName}님의 하루를
              </T>
              <T size={17} font={useContext(UserContext).userFont} black={true}>
                그림일기로 표현해봤어요.
              </T>
            </View>
          )}
        </View>
      </View>
      <View style={style.moonContainer}>
        <Image source={require(`../../assets/img/moon.png`)} style={style.moon}></Image>
      </View>
      {{ drawingDiary } && <Image source={{ uri: drawingDiary }} style={style.paintingDiaryImage}></Image>}

      <View style={style.resultContainer}>
        <View style={style.resultBox}>
          <T size={17} font={useContext(UserContext).userFont}>
            결과가 마음에 드시나요?
          </T>
          <View style={style.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                isLikeIt === 'yes' ? setIsLikeIt('') : setIsLikeIt('yes');
              }}
              activeOpacity={0.7}
              style={style.buttonBox}
            >
              <T size={14} font={useContext(UserContext).userFont} opacity={isLikeIt === 'yes' ? 1 : 0.5}>
                {text.confirmText}
              </T>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                isLikeIt === 'no' ? setIsLikeIt('') : setIsLikeIt('no');
              }}
              activeOpacity={0.7}
              style={style.buttonBox}
            >
              <T size={14} font={useContext(UserContext).userFont} opacity={isLikeIt === 'no' ? 1 : 0.5}>
                {text.deniedText}
              </T>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const T = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  margin-vertical: 2px;
  opacity: ${(props) => props.opacity || 1};
  ${(props) =>
    (props.black &&
      css`
        color: black;
        text-align: center;
      `) ||
    css`
      color: white;
    `};
`;
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
  },
  home: {
    width: 35,
    height: 35,
  },
  homeBox: {
    width: Dimensions.get('window').width / 1.2,
    marginTop: (Dimensions.get('window').height * 5) / 80,
    marginBottom: Dimensions.get('window').height / 80,
    alignItems: 'flex-end',
    height: 35,
  },
  speechBubbleContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    width: Dimensions.get('window').width - 40,
    height: ((Dimensions.get('window').width - 40) * 2) / 3,
    paddingBottom: (Dimensions.get('window').width - 40) / 9,
    position: 'relative',
    justifyContent: 'center',
  },
  speechBubbleBox: {
    alignItems: 'center',
  },
  speechBubbleImage: {
    position: 'absolute',
    width: Dimensions.get('window').width - 40,
    height: ((Dimensions.get('window').width - 40) * 2) / 3,
    resizeMode: 'stretch',
  },
  emotion: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
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
  paintingDiaryImage: {
    marginTop: 30,
    width: Dimensions.get('window').width - 30,
    height: ((Dimensions.get('window').width - 30) * 9) / 16,
    borderWidth: 2,
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
    backgroundColor: basic_theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AnalysisResultView;
