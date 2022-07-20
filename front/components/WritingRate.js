import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

class WritingRate extends Component {
  render() {
    const { attend_day } = this.props;
    const YEAR = new Date().getFullYear(); // 현재 연도
    const MONTH = new Date().getMonth() + 1; // 현재 월
    const number_day = new Date(YEAR, MONTH, 0).getDate(); // 현재 월의 일 수 (ex 7월->31)
    const progress = (attend_day / number_day) * 100; // 다이어리 작성 비율
    return (
      /*다이어리 작성비율 pie chart*/
      <View style={styles.WritingRate}>
        <ProgressCircle percent={100} radius={140} borderWidth={20} color="#D8DFF2">
          <ProgressCircle
            percent={progress}
            radius={120}
            borderWidth={65}
            color="#FDEDB7"
            shadowColor="#A6AEDE"
            bgColor="#A6AEDE"
          >
            <ProgressCircle percent={100} radius={55} borderWidth={15} color="#D8DFF2" bgColor="#A6AEDE">
              <Text style={styles.text}>
                {attend_day}/{number_day}
              </Text>
            </ProgressCircle>
          </ProgressCircle>
        </ProgressCircle>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  WritingRate: {
    paddingTop: 11,
  },
  text: {
    fontSize: 28,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
});
export default WritingRate;
