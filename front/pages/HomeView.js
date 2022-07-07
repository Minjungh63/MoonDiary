import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { basic_theme } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../components/Calendar';

const HomeView = ({ navigation }) => {
  const { userName, setUserName } = useState('홍길동'); //사용자 로그인시 state 관리 필요할 코드
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.text, marginTop: 40 }}>안녕하세요 {userName}님?</Text>
        <Text style={styles.text}>오늘하루는 어떠셨나요?</Text>
      </View>
      <Calendar />
      <View style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="pen" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
  },
  button: {
    margin: 20,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 30,
    borderRadius: 35,
  },
});

export default HomeView;
