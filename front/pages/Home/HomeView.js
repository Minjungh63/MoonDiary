import { View, StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { basic_theme, text } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../../components/Calendar';
import { axios_post, axios_get } from '../../api/api';
import UserContext from '../../service/UserContext';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';
import { ModalWindow } from '../../components/ModalWindow';

const HomeView = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const today = new Date().toISOString().split('T')[0];
  const [isLoading, setLoading] = useState(false);
  const [diaryData, setDiaryData] = useState([]);
  const [todayDiaryData, setTodayDiaryData] = useState();
  const [rejectWriteModal, setRejectWriteModal] = useState(false);
  const isFocused = useIsFocused();
  const getDiaryData = async () => {
    try {
      const userId = userContext.userId;
      const response = await axios_post('diary', { userId });
      if (response.status === 200) {
        var data = response.data;
        setDiaryData(data);
        // data는 Object를 원소로 가지는 Array
        setTodayDiaryData(data.filter((diary) => diary.date === today)[0]);
      }
      setLoading(true);
    } catch (e) {
      console.log('메인통신에러 : ' + e);
    }
  };
  const getResult = async (diaryId) => {
    try {
      const response = await axios_get('diary', { diaryId });
      if (response.status === 200) {
        navigation.navigate('AnalysisResultView', {
          emotion: response.data.emotion,
          comment: response.data.comment || null,
          drawingDiary: response.data.image || null,
        });
      }
    } catch (e) {
      console.log('메인통신에러 : ' + e);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getDiaryData();
    }
  }, [isFocused, userContext.userId]);
  const goWrite = () => {
    if (todayDiaryData) {
      setRejectWriteModal(true);
    } else {
      navigation.navigate('WriteDiaryView', { diaryId: null });
    }
  };
  return (
    isLoading && (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <T font={userContext.userFont} marginTop={40}>
            {text.intro}, {userContext.userName + '님'}
          </T>
          <T font={userContext.userFont} paddingTop={3}>
            오늘 하루는 어떠셨나요?
          </T>
        </View>
        <Calendar diaryData={diaryData} navigation={navigation} />
        <View
          style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}
        >
          <Pressable style={styles.button} onPress={goWrite}>
            <FontAwesome5 name="pen" size={24} color="white" />
          </Pressable>
        </View>
        <ModalWindow
          open={rejectWriteModal}
          okPress={() => getResult(todayDiaryData.diaryId)}
          cancelPress={() => setRejectWriteModal(false)}
          text1="일기를 이미 작성하셨군요!"
          text2="작성한 일기를 보러가시겠어요?"
          confirmText={text.confirmText}
          cancelText={text.deniedText}
          font={userContext.userFont}
        />
      </View>
    )
  );
};
const T = styled.Text`
  font-size: 17px;
  font-family: ${(props) => props.font};
  color: white;
  padding-top: ${(props) => props.paddingTop || 0}px;
  margin-top: ${(props) => props.marginTop || 0}px;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
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
