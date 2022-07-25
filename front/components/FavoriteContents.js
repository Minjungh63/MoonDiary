import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { basic_theme } from '../theme';
import { FontAwesome } from '@expo/vector-icons';
import { getEmotionRequire, getWeatherRequire } from '../service/SelectImage';
import { axios_post } from '../api/api';
import { useContext } from 'react';
import UserContext from '../service/UserContext';
import styled from 'styled-components/native';
export default function FavoriteContents({ diaryId, date, title, weather, emotion, comment, navigation, func }) {
  const cancle = async (id) => {
    await axios_post('favorite', { diaryId: id, liked: false });
    func();
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
  const goRead = () => {
    navigation.navigate('ReadDiaryView', { diaryId, navigation });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goRead}>
        <View style={styles.line}>
          <T font={useContext(UserContext).userFont}>
            {date.toString().replace('-', '년 ').replace('-', '월 ') + '일 '}
          </T>
          <Image source={getEmotionRequire(emotion)} style={styles.image}></Image>
          <Image source={getWeatherRequire(weather)} style={styles.image}></Image>
        </View>
        <View style={{ ...styles.line, justifyContent: 'space-between' }}>
          <T font={useContext(UserContext).userFont}>일기 제목 - {title}</T>
          <TouchableOpacity onPress={() => cancleFav(diaryId)} style={{ marginRight: 5 }}>
            <FontAwesome name="star" size={24} color="yellow" />
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <T font={useContext(UserContext).userFont}>감상평 - {comment}</T>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const T = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.font};
`;
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
