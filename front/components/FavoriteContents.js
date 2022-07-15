import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { basic_theme } from '../theme';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const baseUrl = 'http://152.67.193.252';
const cancleUrl = '/diary/like/';

export default function FavoriteContents({ diaryId, date, title, weather, emotion, comment }) {
  var req_e = require('../assets/img/emotion/joy.png');
  var req_w = require('../assets/img/weather/sunny.png');
  switch (emotion) {
    case 'joy':
      req_e = require('../assets/img/emotion/joy.png');
      break;
    case 'sad':
      req_e = require('../assets/img/emotion/sad.png');
      break;
    case 'angry':
      req_e = require('../assets/img/emotion/angry.png');
      break;
    case 'fear':
      req_e = require('../assets/img/emotion/fear.png');
      break;
    case 'love':
      req_e = require('../assets/img/emotion/love.png');
      break;
    case 'neutral':
      req_e = require('../assets/img/emotion/angry.png');
      break;
    case 'surprised':
      req_e = require('../assets/img/emotion/angry.png');
      break;
    case 'tired':
      req_e = require('../assets/img/emotion/angry.png');
      break;
  }
  switch (weather) {
    case 'sunny':
      req_w = require('../assets/img/weather/sunny.png');
      break;
    case 'stormy':
      req_w = require('../assets/img/weather/stormy.png');
      break;
    case 'rainy':
      req_w = require('../assets/img/weather/rainy.png');
      break;
    case 'hot':
      req_w = require('../assets/img/weather/hot.png');
      break;
    case 'cloudy':
      req_w = require('../assets/img/weather/cloudy.png');
      break;
  }
  //weather, emotion 이미지 선택
  const cancle = async (id) => {
    console.log('삭제');
    await axios.post(`${baseUrl}${cancleUrl}`, {
      diaryId: id,
      liked: 0,
    });
  };
  const cancleFav = (id) => {
    Alert.alert('즐겨찾기 해제', '즐겨찾기 해제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('취소'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => cancle(id),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.text}>{date.toString().replace('-', '년').replace('-', '월') + '일'}</Text>
        <Image source={req_e} style={styles.image}></Image>
        <Image source={req_w} styles={styles.image}></Image>
      </View>
      <View style={{ ...styles.line, justifyContent: 'space-between' }}>
        <Text style={styles.text}>일기 제목 - {title}</Text>
        <TouchableOpacity onPress={() => cancleFav(diaryId)} style={{ marginRight: 5 }}>
          <FontAwesome name="star" size={24} color="yellow" />
        </TouchableOpacity>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>AI 평가 - {comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: basic_theme.fgColor,
    margin: 8,
  },
  text: {
    fontFamily: 'Gowun_Batang',
    fontSize: 16,
  },
  line: {
    flexDirection: 'row',
    margin: 6,
  },
  image: {
    width: 25,
    height: 25,
    marginHorizontal: 6,
  },
});
