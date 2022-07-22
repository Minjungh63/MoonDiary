import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ModalWindow } from '../../components/ModalWindow';
import { basic_theme, text, fonts } from '../../theme';
import UserContext from '../../service/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsView = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(true);
  const [isCommentEnabled, setIsCommentEnabled] = useState(true);
  const [deleteDiaryModalVisible, setdeleteDiaryModalVisible] = useState(false);
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setdeleteAccountModalVisible] = useState(false);
  const deleteDiaryWindow = () => setdeleteDiaryModalVisible((previousState) => !previousState);
  const logoutWindow = () => setlogoutModalVisible((previousState) => !previousState);
  const deleteAccountWindow = () => setdeleteAccountModalVisible((previousState) => !previousState);
  const font = userContext.userFont;
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
    //  로그아웃 기능
    AsyncStorage.clear();
    setlogoutModalVisible(false);
    navigation.navigate('LoginView');
  };
  const deleteAccount = () => {
    //회원탈퇴 코드 여기에 넣기
    setdeleteAccountModalVisible(false);
  };
  const changeFont = (selectedItem, index) => {
    // 폰트 변경하는 코드 여기에 넣기
    userContext.setUserFont(Object.keys(fonts)[index]);
  };
  const AISetting = () => {
    return (
      <View style={[styles().twoContainer, styles().container]}>
        <Text style={[styles(font).text, styles().subtitle]}>AI</Text>
        <View style={[styles().severalSettingBox, styles().settingBox]}>
          {/*그림일기 기능 on off 설정*/}
          <View style={[styles().first_TwoSettingBox, styles().twoSettingBox]}>
            <Text style={[styles(font).text, styles().rowText]}>그림일기 기능</Text>
            <Pressable onPress={drawingtoggleSwitch}>
              <MaterialCommunityIcons
                name={isDrawingEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={isDrawingEnabled ? basic_theme.subColor : basic_theme.fgColor}
              />
            </Pressable>
          </View>
          {/*감상평 기능 on off 설정*/}
          <View style={styles().row}>
            <Text style={[styles(font).text, styles().rowText]}>감상평 기능</Text>
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
      <View style={[styles().twoContainer, styles().container]}>
        <Text style={[styles(font).text, styles().subtitle]}>ALL</Text>
        <View style={[styles().severalSettingBox, styles().settingBox]}>
          {/*기본 폰트 설정*/}
          <View style={[styles().first_TwoSettingBox, styles().twoSettingBox]}>
            <Text style={[styles(font).text, styles().rowText]}>기본 폰트 선택</Text>
            <SelectDropdown
              data={Object.values(fonts)}
              defaultValue={fonts[userContext.userFont]}
              onSelect={changeFont}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles().dropdown}
              buttonTextStyle={styles(font).text}
              rowStyle={styles().dropList}
              rowTextStyle={styles(font).text}
            />
          </View>
          {/*모든 일기 삭제 설정*/}
          <View style={styles().twoSettingBox}>
            <Text style={[styles(font).text, styles().rowText]}>모든 일기 삭제</Text>
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
      <View style={[styles().twoContainer, styles().container]}>
        <View style={[styles().oneSettingBox, styles().settingBox, styles().first_oneSettingBox]}>
          {/*로그아웃 설정*/}
          <View style={styles().twoSettingBox}>
            <Text style={[styles(font).text, styles().rowText]}>로그아웃</Text>
            <Pressable onPress={logoutWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View style={[styles().oneSettingBox, styles().settingBox]}>
          {/*회원탈퇴 설정*/}
          <View style={styles().twoSettingBox}>
            <Text style={[styles(font).text, styles().rowText]}>회원탈퇴</Text>
            <Pressable onPress={deleteAccountWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles().Setting}>
      <View style={[styles().titleContainer, styles().container]}>
        <Text style={[styles(font).text, styles().title]}>{userContext.userName}님, 설정</Text>
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

const styles = (font) =>
  StyleSheet.create({
    Setting: {
      backgroundColor: basic_theme.bgColor,
      flex: 1,
      paddingVertical: '10%',
    },
    text: {
      fontFamily: font,
      fontWeight: 'normal',
      color: 'white',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: '5%',
    },
    titleContainer: {
      flex: 0.1,
    },
    twoContainer: {
      flex: 0.3,
    },
    settingBox: {
      justifyContent: 'space-evenly',
      borderRadius: 12,
      width: '100%',
      borderColor: basic_theme.fgColor,
      borderWidth: 2,
      backgroundColor: 'rgba(222,232,255,0.25)',
      alignItems: 'stretch',
    },
    severalSettingBox: {
      flex: 0.7,
    },
    twoSettingBox: {
      paddingHorizontal: 20,
      flex: 0.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    first_TwoSettingBox: {
      borderBottomWidth: 2,
      borderColor: '#DEE8FF',
    },
    oneSettingBox: {
      flex: 0.35,
    },
    first_oneSettingBox: {
      marginBottom: 15,
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
    dropList: {
      backgroundColor: basic_theme.bgColor,
    },
    rowText: {
      fontSize: 20,
      flex: 0.5,
      textAlign: 'left',
    },
    title: {
      fontSize: 20,
    },
    subtitle: {
      flex: 0.15,
      fontSize: 20,
      alignSelf: 'flex-start',
      paddingLeft: '3%',
    },
  });
export default SettingsView;
