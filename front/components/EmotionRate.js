import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
class EmotionRate extends Component {
  render() {
    {
      /*attend_day: 작성 일 수, emotion_list: emotion별 정보가 담긴 list*/
    }
    const { attend_day, emotion_list } = this.props;
    return (
      <View>
        {/*barChart*/}
        <View style={styles.EmotionRate}>
          {/*작성 일 수가 0일인 경우*/}
          {attend_day === 0 && <View style={styles.emptyRate}></View>}
          {/*작성한 일기가 존재하는 경우*/}
          {emotion_list.map(
            (emotion, index) =>
              emotion.day === 0 || (
                <View
                  style={[
                    styles.Rate,
                    { width: (emotion.day / attend_day) * 100 + '%', backgroundColor: emotion.color },
                  ]}
                  key={index}
                ></View>
              )
          )}
        </View>
        {/*barChart 항목에 대한 설명*/}
        <View style={styles.EmotionRateText}>
          {emotion_list.map(
            (emotion, index) =>
              emotion.day == 0 || (
                <View style={styles.EmotionRateSubtext} key={index}>
                  {/*barChart에서 해당 emotion에 해당하는 색*/}
                  <View style={[styles.RateColor, { backgroundColor: emotion.color }]}></View>
                  {/*emotion의 이름*/}
                  <Text style={styles.RateText}>{emotion.text}</Text>
                </View>
              )
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  EmotionRate: {
    paddingTop: 15,
    flex: 0.8,
    flexDirection: 'row',
    width: '90%',
  },
  emptyRate: {
    alignSelf: 'center',
    fontFamily: 'Gowun_Batang',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#D8DFF2',
  },
  Rate: {
    alignSelf: 'center',
    fontFamily: 'Gowun_Batang',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    height: '100%',
  },
  EmotionRateText: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'center',
  },
  EmotionRateSubtext: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RateColor: {
    height: 10,
    width: 10,
  },
  RateText: {
    paddingRight: 5,
    fontFamily: 'Gowun_Batang',
  },
});
export default EmotionRate;
