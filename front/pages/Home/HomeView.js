import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { basic_theme, text } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../../components/Calendar';
import { axios_post } from '../../api/api';
import UserContext from '../../service/UserContext';

const HomeView = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [diaryData, setDiaryData] = useState([]);
  const getDiaryData = async () => {
    try {
      const userId = userContext.userId;
      const response = await axios_post('diary', { userId });
      if (response.status === 200) {
        var data = response.data;
        setDiaryData(() => data);
        // data는 Object를 원소로 가지는 Array
      }
      setLoading(true);
    } catch (e) {
      console.log('메인통신에러 : ' + e);
    }
  };
  useEffect(() => {
    getDiaryData();
  }, [userContext.userId]);
  const goWrite = () => {
    navigation.navigate('WriteDiaryView');
  };
  return isLoading ? (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.text, marginTop: 40 }}>
          {text.intro}, {userContext.userName + '님'}
        </Text>
        <Text style={styles.text}>오늘 하루는 어떠셨나요?</Text>
      </View>
      <Calendar diaryData={diaryData} navigation={navigation} />
      <View style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={goWrite}>
          <FontAwesome5 name="pen" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  ) : null;
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
    fontFamily: 'Gowun_Batang',
  },
  button: {
    margin: 20,
    backgroundColor: basic_theme.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 30,
    borderRadius: 35,
  },
});

export default HomeView;
