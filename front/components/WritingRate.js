import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

class WritingRate extends Component {
  render() {
    const { attend_day } = this.props;
    const YEAR = new Date().getFullYear();
    const MONTH = new Date().getMonth() + 1;
    const number_day = new Date(YEAR, MONTH, 0).getDate(); // 이번월의 일 수
    const progress = (attend_day / number_day) * 100; // 다이어리 작성 비율
    return (
      <View style={{ paddingTop: 11 }}>
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
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
});
export default WritingRate;
