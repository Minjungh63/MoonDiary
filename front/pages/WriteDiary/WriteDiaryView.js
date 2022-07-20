import { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { basic_theme } from '../../theme';
import { axios_post } from '../../api/api';
import { getWeatherRequire } from '../../service/SelectImage';
import { MaterialIcons } from '@expo/vector-icons';

const WriteDiaryView = ({ navigation, date }) => {
  const [userId, setUserId] = useState('');
  const [weather, setWeather] = useState('sunny');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  AsyncStorage.getItem('userId') //로그인확인
    .then((value) => setUserId(value))
    .catch((e) => navigation.replace('LoginView'));

  const submitDiaryData = async () => {
    //입력 안했을 시 예외처리 코드 날씨는 default sunny이므로 필요X
    if (!title) {
      alert('제목을 입력해주세요');
    } else if (!contents) {
      alert('내용을 입력해주세요');
    }
    // alert(`${userId}, ${date}, ${weather}, ${title}, ${contents}`); //확인용
    const response = await axios_post('write', { userId, date, weather, title, contents });
    if (response.status == 201) {
      navigation.navigate('AnalysisLoadingView', {
        diaryId: {
          /**diaryId reponse 받은 diaryId */
        },
      });
    }
  };

  console.log(contents);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <MaterialIcons name="home" size={30} color="white" />
      </TouchableOpacity>
      <View style={style.dateBox}>
        <Text style={dateStyle}>
          {'June 22'}
          {/*date*/}
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.weatherConatiner}>
          <Text style={style.text}>오늘의 날씨 </Text>
          <TouchableOpacity onPress={() => setWeather('sunny')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('sunny')}
              style={weather == 'sunny' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeather('cloudy')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('cloudy')}
              style={weather == 'cloudy' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeather('rainy')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('rainy')}
              style={weather == 'rainy' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeather('stormy')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('stormy')}
              style={weather == 'stormy' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeather('little_cloudy')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('little_cloudy')}
              style={weather == 'little_cloudy' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeather('snowy')} style={style.weatherBox}>
            <Image
              source={getWeatherRequire('snowy')}
              style={weather == 'snowy' ? style.weatherOn : style.weatherOff}
            ></Image>
          </TouchableOpacity>
        </View>

        <View style={style.questionContainer}>
          <Image source={require('../../assets/img/moon.png')} style={style.smallMoon}></Image>
          <View style={style.questionBox}>
            <Text style={style.text}>
              {/**name */}
              {'홍길동님'}
            </Text>
            <Text style={style.text}>{'오늘의 하루는 어땠는지 알려주세요.'}</Text>
          </View>
        </View>

        <View style={style.titleContainer}>
          <Text style={style.text}>제목</Text>
          <View style={style.titleInputBox}>
            <TextInput placeholder="제목을 입력해주세요" onChangeText={setTitle}></TextInput>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={style.contentContainer}>
        <TextInput
          multiline={true}
          placeholder={'내용을 작성해주세요'}
          onChangeText={setContents}
          style={style.contentInput}
        ></TextInput>
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'작성 취소'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitDiaryData} activeOpacity={0.7} style={style.subButtonBox}>
          <Text style={style.smallText}>{'작성 완료'}</Text>
        </TouchableOpacity>
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

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 2,
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
  subButtonBox: {
    marginHorizontal: 12,
    height: 40,
    width: 100,
    borderWidth: 2,
    backgroundColor: basic_theme.subColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.subColor,
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
  weatherConatiner: {
    fontWeight: '800',
    flexDirection: 'row',
    width: Dimensions.get('window').width / 1.25,
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  weatherBox: {
    margin: 4,
    width: 26,
    height: 26,
    alignItems: 'center',
  },

  weatherOn: {
    width: 26,
    height: 26,
  },
  weatherOff: {
    width: 26,
    height: 26,
    opacity: 0.5,
  },
  smallMoon: {
    width: 50,
    height: 50,
  },
  questionContainer: {
    marginTop: 10,
    width: Dimensions.get('window').width / 1.25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionBox: {
    margin: 5,
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.25,
  },

  titleInputBox: {
    marginTop: 3,
    flex: 0.98,
    fontSize: 17,
    marginLeft: 15,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'Gowun_Batang',
  },
  contentContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#0000006b',
    backgroundColor: basic_theme.fgColor,
    height: Dimensions.get('window').height / 2.0,
    width: Dimensions.get('window').width / 1.25,
  },
  contentInput: {
    flex: 1,
    height: Dimensions.get('screen').height / 2.0,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    padding: 8,
  },
});

const dateStyle = StyleSheet.compose(style.text, style.date);

export default WriteDiaryView;
