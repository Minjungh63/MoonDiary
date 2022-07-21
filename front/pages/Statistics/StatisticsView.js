import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { basic_theme } from '../../theme';
import { getEmotionRequire } from '../../service/SelectImage';
import WritingRate from '../../components/WritingRate';
import EmotionRate from '../../components/EmotionRate';
import EmotionTable from '../../components/EmotionTable';
import { axios_get } from '../../api/api';
import UserContext from '../../service/UserContext';

const StatisticsView = () => {
  const userId = useContext(UserContext).userId;
  const [emotion_day, setEmotion_day] = useState([]);
  const attend_day = emotion_day.map((emotion) => emotion.day).reduce((prev, curr) => prev + curr, 0); // 작성 일 수
  const getDay = (id) => {
    return emotion_day.filter((list) => list.emotion === id).map((emotion) => emotion.day);
  }; // emotion이 나온 일 수

  useEffect(() => {
    (async () => {
      const response = await axios_get('statistics', { userId });
      if (response.status == 200) {
        setEmotion_day(response.data.statisticsList);
      }
    })();
  }, []);
  const emotion_list = [
    {
      text: '기쁨',
      day: getDay('joy'),
      color: '#FBEC6B',
      image: getEmotionRequire('joy'),
    },
    {
      text: '사랑',
      day: getDay('love'),
      color: '#FFCDE0',
      image: getEmotionRequire('love'),
    },
    {
      text: '화남',
      day: getDay('anger'),
      color: '#F07C89',
      image: getEmotionRequire('anger'),
    },
    {
      text: '슬픔',
      day: getDay('sadness'),
      color: '#969ECF',
      image: getEmotionRequire('sadness'),
    },
    {
      text: '놀람',
      day: getDay('surprise'),
      color: '#AE98D6',
      image: getEmotionRequire('surprise'),
    },
    {
      text: '지침',
      day: getDay('tired'),
      color: '#DADADA',
      image: getEmotionRequire('tired'),
    },
    {
      text: '평온',
      day: getDay('neutral'),
      color: '#98D5A2',
      image: getEmotionRequire('neutral'),
    },
    {
      text: '공포',
      day: getDay('fear'),
      color: '#999999',
      image: getEmotionRequire('fear'),
    },
  ];
  emotion_list.sort((a, b) => b.day - a.day); // emotion이 나온 일수를 기준으로 내림차순 정렬

  return (
    <View style={styles.container}>
      <View style={styles.WritingRate}>
        <Text style={styles.text}>다이어리 작성 비율</Text>
        <WritingRate attend_day={attend_day} />
      </View>
      <View style={styles.EmotionRate}>
        <Text style={styles.text}>기분 비율</Text>
        <EmotionRate attend_day={attend_day} emotion_list={emotion_list} />
      </View>
      <View style={styles.EmotionTable}>
        <Text style={styles.text}>기분 순위</Text>
        <Text style={styles.subtext}>이번 달에 자주 경험한 기분 순위를 볼 수 있어요.</Text>
        <EmotionTable attend_day={attend_day} emotion_list={emotion_list} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: basic_theme.bgColor,
    padding: 10,
    flex: 1,
  },
  WritingRate: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.55,
  },
  EmotionRate: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.15,
  },
  EmotionTable: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  subtext: {
    fontSize: 13,
    paddingBottom: 15,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
});
export default StatisticsView;
