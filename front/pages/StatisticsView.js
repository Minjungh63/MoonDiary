import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { basic_theme } from '../theme';
import WritingRate from '../components/WritingRate';
import EmotionRate from '../components/EmotionRate';
import EmotionTable from '../components/EmotionTable';
import joyImg from '../assets/img/emotion/joy.png';
import loveImg from '../assets/img/emotion/love.png';
import angryImg from '../assets/img/emotion/angry.png';
import sadImg from '../assets/img/emotion/sad.png';
import surprisedImg from '../assets/img/emotion/surprised.png';
import tiredImg from '../assets/img/emotion/tired.png';
import neutralImg from '../assets/img/emotion/neutral.png';
import fearImg from '../assets/img/emotion/fear.png';
const StatisticsView = () => {
  const emotion_day = [
    { emotion: 'joy', day: 3 },
    { emotion: 'love', day: 1 },
    { emotion: 'angry', day: 2 },
    { emotion: 'tired', day: 1 },
    { emotion: 'neutral', day: 10 },
  ];
  const attend_day = emotion_day.map((emotion) => emotion.day).reduce((prev, curr) => prev + curr, 0);
  const emotion_list = [
    {
      id: '기쁨',
      day: emotion_day.filter((list) => list.emotion == 'joy').map((emotion) => emotion.day),
      color: '#FBEC6B',
      image: joyImg,
    },
    {
      id: '사랑',
      day: emotion_day.filter((list) => list.emotion == 'love').map((emotion) => emotion.day),
      color: '#FFCDE0',
      image: loveImg,
    },
    {
      id: '화남',
      day: emotion_day.filter((list) => list.emotion == 'angry').map((emotion) => emotion.day),
      color: '#F07C89',
      image: angryImg,
    },
    {
      id: '슬픔',
      day: emotion_day.filter((list) => list.emotion == 'sad').map((emotion) => emotion.day),
      color: '#969ECF',
      image: sadImg,
    },
    {
      id: '놀람',
      day: emotion_day.filter((list) => list.emotion == 'surprised').map((emotion) => emotion.day),
      color: '#AE98D6',
      image: surprisedImg,
    },
    {
      id: '지침',
      day: emotion_day.filter((list) => list.emotion == 'tired').map((emotion) => emotion.day),
      color: '#DADADA',
      image: tiredImg,
    },
    {
      id: '평온',
      day: emotion_day.filter((list) => list.emotion == 'neutral').map((emotion) => emotion.day),
      color: '#98D5A2',
      image: neutralImg,
    },
    {
      id: '공포',
      day: emotion_day.filter((list) => list.emotion == 'fear').map((emotion) => emotion.day),
      color: '#999999',
      image: fearImg,
    },
  ];
  emotion_list.sort((a, b) => b.day - a.day);

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { flex: 0.55 }]}>
        <Text style={styles.text}>다이어리 작성 비율</Text>
        <WritingRate attend_day={attend_day} />
      </View>
      <View style={[styles.subContainer, { flex: 0.15 }]}>
        <Text style={styles.text}>기분 비율</Text>
        <EmotionRate attend_day={attend_day} emotion_list={emotion_list} />
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <Text style={styles.text}>기분 순위</Text>
        <Text style={[styles.text, { fontSize: 13, paddingBottom: 15 }]}>
          이번 달에 자주 경험한 기분 순위를 볼 수 있어요.
        </Text>
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
  subContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
});
export default StatisticsView;
