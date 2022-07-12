import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
class EmotionRate extends Component {
  render() {
    const { attend_day, emotion_list } = this.props;
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
const styles = StyleSheet.create({
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
});
export default EmotionRate;
