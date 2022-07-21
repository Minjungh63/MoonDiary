import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { axios_get } from '../../api/api';
import UserContext from '../../service/UserContext';
import { basic_theme } from '../../theme';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { getEmotionRequire, getWeatherRequire } from '../../service/SelectImage';

const ReadDiary = ({ route, navigation }) => {
  const deviceW = Dimensions.get('window').width;
  const deviceH = Dimensions.get('window').height;
  const userContext = useContext(UserContext);
  const [date, setDate] = useState('1999년09월02일');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [weather, setWeather] = useState('');
  const [liked, setLiked] = useState(false);
  const [img, setImg] = useState(null);
  const [comment, setComment] = useState('');
  const [emotion, setEmotion] = useState('');
  const getDiaryData = async (diaryId) => {
    const response = await axios_get('diary', { diaryId });
    if (response.status === 200) {
      setDate(response.data.date.replace('-', '년').replace('-', '월') + '일');
      setTitle(response.data.title);
      setContents(response.data.contents);
      setWeather(response.data.weather);
      setLiked(response.data.liked);
      // setImg(response.data.image);
      // setComment(response.data.comment);
      // setEmotion(response.data.emotion);
    }
  };
  const setFavorite = () => {
    setLiked((liked) => !liked);
    //데이터 베이스에도 넘겨주기
  };
  const goBack = () => {
    navigation.pop();
  };
  useEffect(() => {
    getDiaryData(route.params.diaryId);
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.25, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <TouchableOpacity style={{ paddingTop: 20 }} onPress={goBack}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ ...styles.text, color: 'white', fontSize: 18, paddingTop: 20 }}>
          {userContext.userName}님의 {date.slice(5)} 기록
        </Text>
        <Text></Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#D8E3E4', margin: 10 }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ ...styles.text, fontSize: 14 }}>{date}</Text>
          <Image style={styles.img} source={getEmotionRequire(emotion)}></Image>
          <Image style={styles.img} source={getWeatherRequire(weather)}></Image>
          <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={setFavorite}>
            {liked ? (
              <FontAwesome name="star" size={24} color="yellow" />
            ) : (
              <FontAwesome name="star-o" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
        {img === null ? null : (
          <View style={{ alignItems: 'center', margin: 4 }}>
            <Image
              style={{ width: deviceW / 2, height: deviceH / 4 }}
              source={require('../../assets/img/moon.png')}
            ></Image>
          </View>
        )}
        <View style={{ margin: 10 }}>
          <Text style={{ ...styles.text, fontSize: 16, marginBottom: 2 }}>{title}</Text>
          <Text style={styles.text}>{contents}</Text>
        </View>
      </ScrollView>
      <View style={{ ...styles.mybox, flex: 0.25 }}>
        <Image style={styles.bubbleImg} source={require('../../assets/img/comment-bubble.png')}></Image>
        <Text style={{ ...styles.text, padding: 10, textAlign: 'center' }}>{comment} </Text>
        {/* {1줄일때 padding: 10 2줄일때 padding: 0 하면 얼추 맞는듯?} */}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          style={{ width: deviceW / 5, height: deviceH / 10 }}
          source={require('../../assets/img/moon.png')}
        ></Image>
        <TouchableOpacity style={styles.btn}>
          <Text>수정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
  },
  text: {
    fontFamily: 'Gowun_Batang',
  },
  img: {
    width: 20,
    height: 20,
  },
  mybox: {
    margin: 5,
    alignItems: 'center',
    position: 'relative',
  },
  bubbleImg: {
    position: 'absolute',
  },
  btn: {
    height: 40,
    padding: 10,
    borderRadius: 8,
    backgroundColor: basic_theme.blue,
    justifyContent: 'center',
  },
});

export default ReadDiary;
