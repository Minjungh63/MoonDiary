import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text, Image, Pressable, Alert } from 'react-native';
import rigntButton from '../../assets/img/rignt.png';

const StackSettings = () => {
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const drawingtoggleSwitch = () => setIsDrawingEnabled((previousState) => !previousState);
  const commenttoggleSwitch = () => setIsCommentEnabled((previousState) => !previousState);
  const fontWindow = () => {
    Alert.alert('폰트를 선택해주세요.');
  };
  const deleteDiaryWindow = () => {
    Alert.alert('모든 일기를 삭제하시겠습니까?');
  };
  const logoutWindow = () => {
    Alert.alert('로그아웃 하시겠습니까?');
  };
  const deleteAccountWindow = () => {
    Alert.alert('회원탈퇴 하시겠습니까?');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { flex: 0.1 }]}>
        <Text style={styles.title}>님, 설정</Text>
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <Text style={styles.subtitle}>AI</Text>
        <View style={styles.box}>
          <View style={[styles.row, { borderBottomWidth: 2, borderColor: '#DEE8FF' }]}>
            <Text style={styles.rowText}>그림일기 기능</Text>
            <Switch
              trackColor={{ false: '#DEE8FF', true: '#303B62' }}
              thumbColor={isDrawingEnabled ? 'white' : '#DEE8FF'}
              onValueChange={drawingtoggleSwitch}
              value={isDrawingEnabled}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>감상평 기능</Text>
            <Switch
              trackColor={{ false: '#DEE8FF', true: '#303B62' }}
              thumbColor={isCommentEnabled ? 'white' : '#DEE8FF'}
              onValueChange={commenttoggleSwitch}
              value={isCommentEnabled}
            />
          </View>
        </View>
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <Text style={styles.subtitle}>ALL</Text>
        <View style={styles.box}>
          <View style={[styles.row, { borderBottomWidth: 2, borderColor: '#DEE8FF' }]}>
            <Text style={styles.rowText}>기본 폰트 선택</Text>
            <Pressable onPress={fontWindow}>
              <Image source={rigntButton} style={{ marginRight: 10, marginVertical: 20, marginLeft: 20 }} />
            </Pressable>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>모든 일기 삭제</Text>
            <Pressable onPress={deleteDiaryWindow}>
              <Image source={rigntButton} style={{ marginRight: 10, marginVertical: 20, marginLeft: 20 }} />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <View style={[styles.box, { flex: 0.35, marginBottom: 15 }]}>
          <View style={styles.row}>
            <Text style={styles.rowText}>로그아웃</Text>
            <Pressable onPress={logoutWindow}>
              <Image source={rigntButton} style={{ marginRight: 10, marginVertical: 20, marginLeft: 20 }} />
            </Pressable>
          </View>
        </View>
        <View style={[styles.box, { flex: 0.35 }]}>
          <View style={styles.row}>
            <Text style={styles.rowText}>회원탈퇴</Text>
            <Pressable onPress={deleteAccountWindow}>
              <Image source={rigntButton} style={{ marginRight: 10, marginVertical: 20, marginLeft: 20 }} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A6AEDE',
    flex: 1,
    paddingVertical: '10%',
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  box: {
    flex: 0.7,
    justifyContent: 'space-evenly',
    borderRadius: 12,
    width: '100%',
    borderColor: '#DEE8FF',
    borderWidth: 2,
    backgroundColor: 'rgba(222,232,255,0.25)',
    alignItems: 'stretch',
  },
  row: {
    paddingHorizontal: 20,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowText: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    flex: 0.5,
    textAlign: 'left',
  },
  title: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  subtitle: {
    flex: 0.15,
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    alignSelf: 'flex-start',
    paddingLeft: '3%',
  },
});
export default StackSettings;
