import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';

const StatisticsView = ({ attend_day, emotion_list }) => {
  const YEAR = new Date().getFullYear();
  const MONTH = new Date().getMonth() + 1;
  const number_day = new Date(YEAR, MONTH, 0).getDate(); // 이번월의 일 수
  const progress = (attend_day / number_day) * 100; // 다이어리 작성 비율
  emotion_list.sort((a, b) => b.day - a.day); // 높은 비율의 기분 순서대로 정렬

  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
  class WritingRate extends Component {
    render() {
      return (
        <View style={{ paddingTop: 11 }}>
          <ProgressCircle pertent={100} radius={140} borderWidth={0} bgColor="#D8DFF2">
            <ProgressCircle
              percent={progress}
              radius={120}
              borderWidth={65}
              color="#FDEDB7"
              shadowColor="#A6AEDE"
              bgColor="#A6AEDE"
            >
              <ProgressCircle percent={100} radius={55} borderWidth={15} color="#D8DFF2" bgColor="#A6AEDE">
                <Text style={[styles.text, { fontSize: 28 }]}>
                  {attend_day}/{number_day}
                </Text>
              </ProgressCircle>
            </ProgressCircle>
          </ProgressCircle>
        </View>
      );
    }
  }
  class EmotionRate extends Component {
    render() {
      return (
        <View>
          <View style={styles.barChart}>
            {attend_day == 0 && (
              <View style={[styles.barText, { width: '100%', backgroundColor: '#D8DFF2', borderRadius: 12 }]}></View>
            )}
            {emotion_list.map(
              (emotion, index) =>
                emotion.day == 0 || (
                  <View
                    style={[
                      styles.barText,
                      { width: (emotion.day / attend_day) * 100 + '%', backgroundColor: emotion.color },
                    ]}
                    key={index}
                  ></View>
                )
            )}
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'center' }}>
            {emotion_list.map(
              (emotion, index) =>
                emotion.day == 0 || (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                    <View style={{ height: 10, width: 10, backgroundColor: emotion.color }}></View>
                    <Text style={{ paddingRight: 5, fontFamily: 'Gowun_Batang' }}>{emotion.id}</Text>
                  </View>
                )
            )}
          </View>
        </View>
      );
    }
  }
  class EmotionTable extends Component {
    render() {
      return (
        <View style={styles.table}>
          {attend_day == 0 && <Text style={styles.rowText}>이번 달 일기를 작성해보세요!</Text>}
          {emotion_list.map(
            (emotion, index) =>
              index < 3 &&
              emotion.day != 0 && (
                <View style={styles.row} key={index}>
                  <Text style={[styles.rowText, { flex: 0.1, textAlign: 'left' }]}>{index + 1}</Text>
                  <Image source={emotion.image} style={styles.image} />
                  <Text style={[styles.rowText, { flex: 0.5 }]}>{emotion.id}</Text>
                  <Text style={[styles.rowText, { flex: 0.2 }]}>{emotion.day}</Text>
                </View>
              )
          )}
        </View>
      );
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { flex: 0.55 }]}>
        <Text style={styles.text}>다이어리 작성 비율</Text>
        <WritingRate />
      </View>
      <View style={[styles.subContainer, { flex: 0.15 }]}>
        <Text style={styles.text}>기분 비율</Text>
        <EmotionRate />
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <Text style={styles.text}>기분 순위</Text>
        <Text style={[styles.text, { fontSize: 13, paddingBottom: 15 }]}>
          이번 달에 자주 경험한 기분 순위를 볼 수 있어요.
        </Text>
        <EmotionTable />
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
  barChart: {
    paddingTop: 15,
    flex: 0.8,
    flexDirection: 'row',
    width: '90%',
  },
  barText: {
    alignSelf: 'center',
    fontFamily: 'Gowun_Batang',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    height: '100%',
  },
  table: {
    flex: 0.9,
    backgroundColor: '#D8DFF2',
    justifyContent: 'space-evenly',
    borderRadius: 12,
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowText: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  image: {
    flex: 0.2,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});
import joyImg from '../assets/img/emotion/joy.png';
import loveImg from '../assets/img/emotion/love.png';
import angryImg from '../assets/img/emotion/angry.png';
import sadImg from '../assets/img/emotion/sad.png';
import surprisedImg from '../assets/img/emotion/surprised.png';
import tiredImg from '../assets/img/emotion/tired.png';
import neutralImg from '../assets/img/emotion/neutral.png';
import fearImg from '../assets/img/emotion/fear.png';
StatisticsView.defaultProps = {
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
StatisticsView.propTypes = {
  attend_day: PropTypes.number,
  emotion_list: PropTypes.array,
};
export default StatisticsView;
