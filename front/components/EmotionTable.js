import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class EmotionTable extends Component {
  render() {
    {
      /*attend_day: 작성 일 수, emotion_list: emotion별 정보가 담긴 list*/
    }
    const { attend_day, emotion_list } = this.props;
    return (
      <View style={styles.EmotionTable}>
        {attend_day === 0 ? (
          <Text style={styles.text}>이번 달 일기를 작성해보세요!</Text>
        ) : (
          emotion_list.map(
            (emotion, index) =>
              index < 3 &&
              emotion.day.length !== 0 && (
                <View style={styles.row} key={index}>
                  {/*emotion의 rank*/}
                  <Text style={styles.EmotionRank}>{index + 1}</Text>
                  {/*emotion의 image*/}
                  <Image source={emotion.image} style={styles.image} />
                  {/*emotion의 이름*/}
                  <Text style={styles.EmotionName}>{emotion.text}</Text>
                  {/*emotion이 나온 일 수*/}
                  <Text style={styles.EmotionDay}>{emotion.day}일</Text>
                </View>
              )
          )
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  EmotionTable: {
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
  EmotionRank: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    flex: 0.1,
    textAlign: 'left',
  },
  EmotionName: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    flex: 0.5,
    textAlign: 'center',
  },
  EmotionDay: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    flex: 0.3,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    textAlign: 'center',
  },
  image: {
    flex: 0.2,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});
export default EmotionTable;
