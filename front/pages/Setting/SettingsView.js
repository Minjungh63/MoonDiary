import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import Modal from 'react-native-simple-modal';
import { basic_theme } from '../theme';

const SettingsView = () => {
  const fonts = ['고운바탕', '나눔고딕', '나눔명조', 'Sans-Serif'];
  const [font, setFont] = useState(fonts[0]);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(true);
  const [isCommentEnabled, setIsCommentEnabled] = useState(true);
  const [deleteDiaryModalVisible, setdeleteDiaryModalVisible] = useState(false);
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setdeleteAccountModalVisible] = useState(false);
  const deleteDiaryWindow = () => setdeleteDiaryModalVisible((previousState) => !previousState);
  const logoutWindow = () => setlogoutModalVisible((previousState) => !previousState);
  const deleteAccountWindow = () => setdeleteAccountModalVisible((previousState) => !previousState);
  const drawingtoggleSwitch = () => {
    // 그림일기 기능 on off 코드 여기에 넣기
    setIsDrawingEnabled((previousState) => !previousState);
  };
  const commenttoggleSwitch = () => {
    // 감상평 기능 on off 코드 여기에 넣기
    setIsCommentEnabled((previousState) => !previousState);
  };
  const deleteDiary = () => {
    //다이어리 삭제 코드 여기에 넣기
    setdeleteDiaryModalVisible(false);
  };
  const logout = () => {
    //로그아웃 코드 여기에 넣기
    setlogoutModalVisible(false);
  };
  const deleteAccount = () => {
    //회원탈퇴 코드 여기에 넣기
    setdeleteAccountModalVisible(false);
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
            <Pressable onPress={drawingtoggleSwitch}>
              <MaterialCommunityIcons
                name={isDrawingEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={45}
                color={isDrawingEnabled ? '#303B62' : '#DEE8FF'}
              />
            </Pressable>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>감상평 기능</Text>
            <Pressable onPress={commenttoggleSwitch}>
              <MaterialCommunityIcons
                name={isCommentEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={45}
                color={isCommentEnabled ? '#303B62' : '#DEE8FF'}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <Text style={styles.subtitle}>ALL</Text>
        <View style={styles.box}>
          <View style={[styles.row, { borderBottomWidth: 2, borderColor: '#DEE8FF' }]}>
            <Text style={styles.rowText}>기본 폰트 선택</Text>
            {/*폰트 drop down*/}
            <SelectDropdown
              data={fonts}
              defaultValue={font}
              onSelect={(selectedItem, index) => {
                // 폰트 변경하는 코드 여기에 넣기
                setFont(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown}
              buttonTextStyle={styles.dropText}
              rowStyle={styles.dropList}
              rowTextStyle={styles.dropText}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.rowText}>모든 일기 삭제</Text>
            <Pressable onPress={deleteDiaryWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.subContainer, { flex: 0.3 }]}>
        <View style={[styles.box, { flex: 0.35, marginBottom: 15 }]}>
          <View style={styles.row}>
            <Text style={styles.rowText}>로그아웃</Text>
            <Pressable onPress={logoutWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={[styles.box, { flex: 0.35 }]}>
          <View style={styles.row}>
            <Text style={styles.rowText}>회원탈퇴</Text>
            <Pressable onPress={deleteAccountWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      {/*모든 일기 삭제 modal*/}
      <Modal open={deleteDiaryModalVisible} modalStyle={styles.modal}>
        <Text style={styles.modalText}>작성하신 모든 일기가 삭제됩니다.</Text>
        <Text style={[styles.modalText, { flex: 0.3 }]}>모든 일기를 삭제하시겠습니까?</Text>
        <View style={[styles.row, { flex: 0.4, paddingHorizontal: '30%' }]}>
          <Pressable onPress={deleteDiary}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>삭제</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setdeleteDiaryModalVisible(false)}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>취소</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
      {/*로그아웃 modal*/}
      <Modal open={logoutModalVisible} modalStyle={styles.modal}>
        <Text style={[styles.modalText, { flex: 0.3 }]}>로그아웃 하시겠습니까?</Text>
        <View style={[styles.row, { flex: 0.4, paddingHorizontal: '30%' }]}>
          <Pressable onPress={logout}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>확인</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setlogoutModalVisible(false)}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>취소</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
      {/*회원탈퇴 modal*/}
      <Modal open={deleteAccountModalVisible} modalStyle={styles.modal}>
        <Text style={styles.modalText}>회원님에 대한 모든 정보가 삭제됩니다.</Text>
        <Text style={[styles.modalText, { flex: 0.3 }]}>계정을 삭제하시겠습니까?</Text>
        <View style={[styles.row, { flex: 0.4, paddingHorizontal: '30%' }]}>
          <Pressable onPress={deleteAccount}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>삭제</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setdeleteAccountModalVisible(false)}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>취소</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: basic_theme.bgColor,
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
    borderColor: basic_theme.fgColor,
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
  dropdown: {
    backgroundColor: 'rgba(222,232,255,0.2)',
    flex: 0.4,
    borderRadius: 12,
  },
  dropText: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    textAlign: 'center',
  },
  dropList: {
    backgroundColor: basic_theme.bgColor,
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
  modal: {
    backgroundColor: basic_theme.btnColor,
    flex: 0.3,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 10,
    flex: 0.6,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: basic_theme.bgColor,
    width: '300%',
  },
});
export default SettingsView;
