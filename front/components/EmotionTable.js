import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class EmotionTable extends Component {
  render() {
    const { attend_day, emotion_list } = this.props;
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
                <Text style={[styles.rowText, { flex: 0.3 }]}>{emotion.day}일</Text>
              </View>
            )
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
export default EmotionTable;
