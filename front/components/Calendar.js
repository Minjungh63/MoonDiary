import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { getEmotionRequire } from '../service/SelectImage';
import { month } from '../theme';

const dayOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const date = new Date();
const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
const kstGap = 9 * 60 * 60 * 1000;
const today = new Date(utc + kstGap);
//한국시간 기준으로 날짜계산하기 위함

export default function Calendar({ diaryData }) {
  //diaryData = [{}, { diaryId, date, emotion }, {}]
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [dayArr, setDayArr] = useState([]);
  const [loadFlag, setLoadFlag] = useState(false);
  const [filteringData, setFilter] = useState(diaryData);
  var startDay = new Date(selectedYear, selectedMonth - 1, 0);
  var prevDate = startDay.getDate();
  var prevDay = startDay.getDay();
  var endDay = new Date(selectedYear, selectedMonth, 0);
  var nextDate = endDay.getDate();
  var nextDay = endDay.getDay();
  const pressBack = async () => {
    //이전 월로 이동
    //render에 반영하기 위한 비동기 처리
    if (selectedMonth === 1) {
      await setSelectedYear((selectedYear) => selectedYear - 1);
      await setSelectedMonth(12);
    } else {
      await setSelectedMonth((selectedMonth) => selectedMonth - 1);
    }
  };
  const pressAdvance = async () => {
    //다음 월로 이동
    //render에 반영하기 위한 비동기처리
    if (selectedMonth === 12) {
      await setSelectedYear((selectedYear) => selectedYear + 1);
      await setSelectedMonth(1);
    } else {
      await setSelectedMonth((selectedMonth) => selectedMonth + 1);
    }
  };
  const setDay = () => {
    //현재 선택된 년, 월에 대한 달력 날짜 계산 세팅
    startDay = new Date(selectedYear, selectedMonth - 1, 0);
    prevDate = startDay.getDate();
    prevDay = startDay.getDay();
    endDay = new Date(selectedYear, selectedMonth, 0);
    nextDate = endDay.getDate();
    nextDay = endDay.getDay();
  };
  const calDay = () => {
    //달력 render를 위한 이전 달과 다음달 포함한 날짜 계산
    var tempArr = [];
    for (var j = prevDate - prevDay; j <= prevDate; j++) {
      if (prevDay === 6) {
        //이전달의 7개 이상의 데이터 있을 시 push 하지 않음
        break;
      }
      tempArr.push('');
    }
    for (var j = 1; j <= nextDate; j++) {
      tempArr.push(j);
    }
    for (var j = 1; j < (7 - nextDay == 7 ? 0 : 7 - nextDay); j++) {
      tempArr.push('');
    }
    setDayArr(tempArr);
    setLoadFlag(true);
  };
  const dataCheck = (day) => {
    //받아 온 전체 데이터 중 현재월에 맞는 데이터를 걸러냄
    var nowMonth = selectedMonth.toString().length === 1 ? '0' + selectedMonth : selectedMonth;
    var nowDay = day.toString().length === 1 ? '0' + day : day;
    for (var i = 0; i < filteringData.length; i++) {
      if (filteringData[i].date === selectedYear + '-' + nowMonth + '-' + nowDay) {
        return { emotion: filteringData[i].emotion, diaryId: filteringData[i].diaryId };
      }
    }
    return false;
  };
  const readDiary = (diaryId) => {
    //다이어리 아이디 바탕으로 읽기화면으로 이동
  };
  useEffect(() => {
    setDay();
    calDay();
    setFilter(() =>
      diaryData.filter((val) => {
        if (val.date.slice(5, 7) === (selectedMonth.toString().length === 1 ? '0' + selectedMonth : selectedMonth)) {
          return true;
        }
      })
    );
  }, [selectedMonth]);
  const Items = ({ data }) => {
    //현재 월에 맞는 '일', 일기 정보있는 '일'에 Emotion image 넣기
    var final_data = dataCheck(data);
    return (
      <View>
        <Text style={styles.text}>{data}</Text>
        <View style={{ alignSelf: 'center' }}>
          {final_data ? (
            <TouchableOpacity onPress={readDiary(final_data.diaryId)}>
              <Image style={styles.img} source={getEmotionRequire(final_data.emotion)}></Image>
            </TouchableOpacity>
          ) : (
            <Text style={styles.img}> </Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 4, marginHorizontal: 15 }}>
      <View style={{ ...styles.rowViewTop, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <TouchableOpacity onPress={pressBack}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {' '}
          {month[selectedMonth - 1]} {selectedYear}{' '}
        </Text>
        <TouchableOpacity onPress={pressAdvance}>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.rowViewTop}>
        {dayOfWeek.map((val, i) => {
          if (i === 0) {
            return (
              <View key={i} style={styles.container}>
                <Text style={{ ...styles.text, color: 'red' }}>{val}</Text>
              </View>
            );
          } else if (i === 6) {
            return (
              <View key={i} style={styles.container}>
                <Text style={{ ...styles.text, color: 'blue' }}>{val}</Text>
              </View>
            );
          } else {
            return (
              <View key={i} style={styles.container}>
                <Text style={styles.text}>{val}</Text>
              </View>
            );
          }
        })}
      </View>
      {loadFlag ? (
        <FlatList
          style={{
            backgroundColor: 'white',
          }}
          data={dayArr}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingVertical: 15,
            paddingHorizontal: 10,
          }}
          renderItem={({ item }) => <Items data={item} />}
          keyExtractor={(item, index) => index}
          numColumns={7}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  rowViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#dee8ff',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  text: {
    minWidth: 30,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    marginTop: 5,
    width: 25,
    height: 25,
  },
});
