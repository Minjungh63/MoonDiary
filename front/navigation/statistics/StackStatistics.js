import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import PropTypes from 'prop-types';
import WritingRate from '../../components/WritingRate';
import EmotionRate from '../../components/EmotionRate';
import EmotionTable from '../../components/EmotionTable';

const StackStatistics = ({ attend_day, emotion_list }) => {
  emotion_list.sort((a, b) => b.day - a.day); // 높은 비율의 기분 순서대로 정렬

  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../../assets/fonts/GowunBatang-Regular.ttf'),
  });
  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
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
    backgroundColor: '#A6AEDE',
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
import joyImg from '../../assets/img/emotion/joy.png';
import loveImg from '../../assets/img/emotion/love.png';
import angryImg from '../../assets/img/emotion/angry.png';
import sadImg from '../../assets/img/emotion/sad.png';
import surprisedImg from '../../assets/img/emotion/surprised.png';
import tiredImg from '../../assets/img/emotion/tired.png';
import neutralImg from '../../assets/img/emotion/neutral.png';
import fearImg from '../../assets/img/emotion/fear.png';
StackStatistics.defaultProps = {
  attend_day: 17, // 이번월의 일기 작성 일 수. 값 가져오기
  emotion_list: [
    // 기분에 대한 정보. 값 가져오기
    { id: '기쁨', day: 3, color: '#FBEC6B', image: joyImg },
    { id: '사랑', day: 1, color: '#FFCDE0', image: loveImg },
    { id: '화남', day: 2, color: '#F07C89', image: angryImg },
    { id: '슬픔', day: 0, color: '#969ECF', image: sadImg },
    { id: '놀람', day: 0, color: '#AE98D6', image: surprisedImg },
    { id: '지침', day: 1, color: '#DADADA', image: tiredImg },
    { id: '평온', day: 10, color: '#98D5A2', image: neutralImg },
    { id: '공포', day: 0, color: '#999999', image: fearImg },
  ],
};
StackStatistics.propTypes = {
  attend_day: PropTypes.number,
  emotion_list: PropTypes.array,
};
export default StackStatistics;
