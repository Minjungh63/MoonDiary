import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { basic_theme } from '../theme';
import { FontAwesome } from '@expo/vector-icons';
import { getEmotionRequire, getWeatherRequire } from '../service/SelectImage';
import { axios_post } from '../api/api';

export default function FavoriteContents({ diaryId, date, title, weather, emotion, comment }) {
  const cancle = async (id) => {
    console.log('삭제');
    await axios_post('favorite', { diaryId: id, liked: 0 });
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
        <Text style={styles.text}>{date.toString().replace('-', '년 ').replace('-', '월 ') + '일 '}</Text>
        <Image source={getEmotionRequire(emotion)} style={styles.image}></Image>
        <Image source={getWeatherRequire(weather)} style={styles.image}></Image>
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
