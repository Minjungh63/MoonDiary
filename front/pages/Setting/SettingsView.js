import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ModalWindow } from '../../components/ModalWindow';
import { basic_theme, text, fonts } from '../../theme';
import UserContext from '../../service/UserContext';

const SettingsView = () => {
  const userContext = useContext(UserContext);
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
  const changeFont = (selectedItem, index) => {
    // 폰트 변경하는 코드 여기에 넣기
    setFont(selectedItem);
  };
  const AISetting = () => {
    return (
      <View style={styles.twoContainer}>
        <Text style={styles.subtitle}>AI</Text>
        <View style={styles.severalSettings}>
          {/*그림일기 기능 on off 설정*/}
          <View style={styles.FirstSetting}>
            <Text style={styles.rowText}>그림일기 기능</Text>
            <Pressable onPress={drawingtoggleSwitch}>
              <MaterialCommunityIcons
                name={isDrawingEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={isDrawingEnabled ? basic_theme.subColor : basic_theme.fgColor}
              />
            </Pressable>
          </View>
          {/*감상평 기능 on off 설정*/}
          <View style={styles.row}>
            <Text style={styles.rowText}>감상평 기능</Text>
            <Pressable onPress={commenttoggleSwitch}>
              <MaterialCommunityIcons
                name={isCommentEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={isCommentEnabled ? basic_theme.subColor : basic_theme.fgColor}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  const DiarySetting = () => {
    return (
      <View style={styles.twoContainer}>
        <Text style={styles.subtitle}>ALL</Text>
        <View style={styles.severalSettings}>
          {/*기본 폰트 설정*/}
          <View style={styles.FirstSetting}>
            <Text style={styles.rowText}>기본 폰트 선택</Text>
            <SelectDropdown
              data={fonts}
              defaultValue={font}
              onSelect={changeFont}
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
          {/*모든 일기 삭제 설정*/}
          <View style={styles.LastSetting}>
            <Text style={styles.rowText}>모든 일기 삭제</Text>
            <Pressable onPress={deleteDiaryWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  const AccountSetting = () => {
    return (
      <View style={styles.twoContainer}>
        <View style={styles.LogoutSetting}>
          {/*로그아웃 설정*/}
          <View style={styles.LastSetting}>
            <Text style={styles.rowText}>로그아웃</Text>
            <Pressable onPress={logoutWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={styles.AccountSetting}>
          {/*회원탈퇴 설정*/}
          <View style={styles.LastSetting}>
            <Text style={styles.rowText}>회원탈퇴</Text>
            <Pressable onPress={deleteAccountWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.Setting}>
      <View style={styles.SettingTitle}>
        <Text style={styles.title}>{userContext.userName}님, 설정</Text>
      </View>
      <AISetting />
      <DiarySetting />
      <AccountSetting />

      <ModalWindow
        open={deleteDiaryModalVisible}
        okPress={deleteDiary}
        cancelPress={() => setdeleteDiaryModalVisible(false)}
        text1="작성하신 모든 일기가 삭제됩니다."
        text2="모든 일기를 삭제하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
      />
      <ModalWindow
        open={logoutModalVisible}
        okPress={logout}
        cancelPress={() => setlogoutModalVisible(false)}
        text2="로그아웃 하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
      />
      <ModalWindow
        open={deleteAccountModalVisible}
        okPress={deleteAccount}
        cancelPress={() => setdeleteAccountModalVisible(false)}
        text1="회원님에 대한 모든 정보가 삭제됩니다."
        text2="계정을 삭제하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Setting: {
    backgroundColor: basic_theme.bgColor,
    flex: 1,
    paddingVertical: '10%',
  },
  SettingTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    flex: 0.1,
  },
  twoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    flex: 0.3,
  },
  severalSettings: {
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
  FirstSetting: {
    paddingHorizontal: 20,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: '#DEE8FF',
  },
  LastSetting: {
    paddingHorizontal: 20,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LogoutSetting: {
    justifyContent: 'space-evenly',
    borderRadius: 12,
    width: '100%',
    borderColor: basic_theme.fgColor,
    borderWidth: 2,
    backgroundColor: 'rgba(222,232,255,0.25)',
    alignItems: 'stretch',
    flex: 0.35,
    marginBottom: 15,
  },
  AccountSetting: {
    justifyContent: 'space-evenly',
    borderRadius: 12,
    width: '100%',
    borderColor: basic_theme.fgColor,
    borderWidth: 2,
    backgroundColor: 'rgba(222,232,255,0.25)',
    alignItems: 'stretch',
    flex: 0.35,
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
});
export default SettingsView;
