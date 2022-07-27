import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { axios_get, axios_post } from '../../api/api';
import UserContext from '../../service/UserContext';
import { basic_theme, getEmotionText, getEmotionColor } from '../../theme';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { getEmotionRequire, getWeatherRequire } from '../../service/SelectImage';
import styled from 'styled-components/native';

const ReadDiary = ({ route, navigation }) => {
  const deviceH = Dimensions.get('window').height;
  const userContext = useContext(UserContext);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [weather, setWeather] = useState('');
  const [liked, setLiked] = useState(false);
  const [img, setImg] = useState(null);
  const [comment, setComment] = useState('');
  const [emoComment, setEmoComment] = useState('');
  const [emotion, setEmotion] = useState('');

  const getDiaryData = async (diaryId) => {
    const response = await axios_get('diary', { diaryId });
    if (response.status === 200) {
      setDate(response.data.date.replace('-', '년 ').replace('-', '월 ') + '일');
      setTitle(response.data.title);
      setContents(response.data.contents);
      setWeather(response.data.weather);
      setLiked(response.data.liked);
      setImg(response.data.image); // 이미지 스토리지에서 받아오는 코드로 수정하기
      setComment(response.data.comment);
      setEmotion(response.data.emotion);
      setEmoComment(getEmotionText[response.data.emotion]);
    }
  };
  const setFavorite = async () => {
    await axios_post('favorite', { diaryId: route.params.diaryId, liked: !liked });
    setLiked((liked) => !liked);
  };
  const goBack = () => {
    navigation.pop();
  };
  const reviseDiary = () => {
    navigation.navigate('WriteDiaryView', {
      navigation,
      date,
      title,
      contents,
      weather,
      diaryId: route.params.diaryId,
    });
  };
  useEffect(() => {
    getDiaryData(route.params.diaryId);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity style={{ paddingTop: 20 }} onPress={goBack}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <T font={userContext.userFont} size={18} paddingTop={20} align="center" color="white">
          {date.slice(6)} 기록
        </T>
        <Text> </Text>
      </View>
      <ScrollView style={{ flex: 0.5, backgroundColor: getEmotionColor[emotion] }}>
        <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
          <T font={userContext.userFont} size={18} align="left" color="black">
            {date}
          </T>
          <Image style={styles.img} source={getEmotionRequire(emotion)}></Image>
          <Image style={styles.img} source={getWeatherRequire(weather)}></Image>
          <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={setFavorite}>
            {liked ? (
              <FontAwesome name="star" size={24} color="yellow" />
            ) : (
              <FontAwesome name="star-o" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
        {/*imageYN이 false여서 그림일기 이미지가 생성되지 않은 경우, 그림일기 이미지가 보이지 않음.*/}
        {{ img } && (
          <View style={{ alignItems: 'center', margin: 4 }}>
            {/*이미지를 스토리지에서 가져오는 코드로 수정하기. (source={img}부분 수정해야 함.)*/}
            <Image
              // pixray 그림일기 사진 비율 => 16:9
              style={{ width: (deviceH * 4) / 9, height: deviceH / 4 }}
              source={{ uri: img }}
            ></Image>
          </View>
        )}
        <View style={{ margin: 10 }}>
          <T font={userContext.userFont} size={18} align="left" color="black">
            [ {title} ]
          </T>
          <T font={userContext.userFont} size={16} align="left" color="black" paddingTop={3}>
            {contents}
          </T>
        </View>
      </ScrollView>
      <View style={{ ...styles.mybox, flex: 0.15 }}>
        <Image style={styles.bubbleImg} source={require('../../assets/img/comment-bubble.png')}></Image>
        <View
          style={{
            width: Dimensions.get('window').width - 20,
            height: Dimensions.get('window').height / 12,
            justifyContent: 'center',
          }}
        >
          <T font={userContext.userFont} size={16} align="center" color="black" paddingBottom={{ comment } ? 1 : 0}>
            {emoComment}
          </T>
          {/*commentYN이 false여서 감상평이 생성되지 않은 경우, 감상평이 출력되지 않음.*/}
          {{ comment } && (
            <T font={userContext.userFont} size={16} align="center" color="black" paddingTop={1}>
              {comment}
            </T>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 0.15,
        }}
      >
        <Image
          style={{ width: deviceH / 12, height: deviceH / 12, resizeMode: 'contain' }}
          source={require('../../assets/img/moon.png')}
        ></Image>
        <TouchableOpacity style={styles.btn} onPress={reviseDiary}>
          <T font={userContext.userFont} size={16} align="center" color="white">
            수정하기
          </T>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const T = styled.Text`
  font-family: ${(props) => props.font};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}px;
  padding-top: ${(props) => props.paddingTop || 0}px;
  padding-bottom: ${(props) => props.paddingBottom || 0}px;
  text-align: ${(props) => props.align};
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    padding: 10,
  },
  img: {
    marginLeft: 5,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  mybox: {
    margin: 5,
    alignItems: 'center',
    position: 'relative',
  },
  bubbleImg: {
    position: 'absolute',
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height / 8,
    resizeMode: 'stretch',
  },
  btn: {
    backgroundColor: basic_theme.blue,
    justifyContent: 'center',
    borderRadius: 100,
    height: 45,
    width: 90,
  },
});

export default ReadDiary;
