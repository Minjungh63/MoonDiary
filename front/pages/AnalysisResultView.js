import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../theme';

const baseUrl = 'http://127.0.0.1:8000';
const resultUrl = '/diary/write/result';

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

const AnalysisResultView = ({ navigation, diaryId }) => {
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
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <Image source={require('../assets/img/home.png')} style={style.home}></Image>
      </TouchableOpacity>
      <View style={style.speechBubbleContainer}>
        <Image source={require('../assets/img/speech-bubble.png')} style={style.speechBubbleImage}></Image>
        <View style={style.speechBubbleBox}>
          <View style={style.textBox}>
            <Text style={style.blackText}>{/**name */}님,</Text>
            <Text style={style.blackText}>
              {/**name */}오늘의 하루는 {/** 감정 */} 하루였군요!
            </Text>
          </View>
          <Image source={require(`../assets/img/emotion/joy.png`)} style={style.emotion}></Image>
          <View style={style.textBox}>
            <Text style={style.blackText}>{'오늘 생일파티는 재밌으셨나요?'}</Text>
          </View>
          <View style={style.textBox}>
            <Text style={style.blackText}>제가 {/*name*/}님의 하루를</Text>
            <Text style={style.blackText}>{'그림일기로 표현해봤어요.'}</Text>
          </View>
        </View>
      </View>
      <View style={style.moonContainer}>
        <Image source={require(`../assets/img/moon.png`)} style={style.moon}></Image>
      </View>
      <View style={style.paintingDiaryContainer}></View>
      <View style={style.resultContainer}>
        <View style={style.resultBox}>
          <Text style={style.text}>결과가 마음에 드시나요?</Text>
          <View style={style.buttonContainer}>
            <TouchableOpacity activeOpacity={0.7} style={style.buttonBox}>
              <Text style={style.smallText}>{'예'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={style.buttonBox}>
              <Text style={style.smallText}>{'아니오'}</Text>
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
    backgroundColor: '#fff',
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
