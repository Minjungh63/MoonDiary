import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';

class EmotionTable extends Component {
  render() {
    {
      /*attend_day: 작성 일 수, emotion_list: emotion별 정보가 담긴 list*/
    }
    const { attend_day, emotion_list, font } = this.props;
    return (
      <View style={styles.EmotionTable}>
        {attend_day === 0 ? (
          <View style={styles.row}>
            <T font={font} style="empty">
              이번 달 일기를 작성해보세요!
            </T>
          </View>
        ) : (
          emotion_list.map(
            (emotion, index) =>
              index < 3 &&
              emotion.day.length !== 0 && (
                <View style={styles.row} key={index}>
                  {/*emotion의 rank*/}
                  <T font={font} style="rank">
                    {index + 1}
                  </T>
                  {/*emotion의 image*/}
                  <Image source={emotion.image} style={styles.image} />
                  {/*emotion의 이름*/}
                  <T font={font} style="name">
                    {emotion.text}
                  </T>
                  {/*emotion이 나온 일 수*/}
                  <T font={font} style="day">
                    {emotion.day}일
                  </T>
                </View>
              )
          )
        )}
      </View>
    );
  }
}
const T = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.font};
  color: black;
  padding-left: 20px;
  flex: ${(props) =>
    (props.style === 'rank' && 0.1) || (props.style === 'name' && 0.5) || (props.style === 'day' && 0.3) || 1};
  text-align: ${(props) => (props.style === 'rank' && 'left') || 'center'};
`;
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
  image: {
    flex: 0.2,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Gowun_Batang',
    color: 'black',
    paddingLeft: 20,
    textAlign: 'center',
  },
});
export default EmotionTable;
