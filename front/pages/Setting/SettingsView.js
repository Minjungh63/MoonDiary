import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ModalWindow } from '../../components/ModalWindow';
import { basic_theme, text, fonts } from '../../theme';
import UserContext from '../../service/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios_post } from '../../api/api';
import styled, { css } from 'styled-components/native';

const SettingsView = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(userContext.imageYN);
  const [isCommentEnabled, setIsCommentEnabled] = useState(userContext.commentYN);
  const [deleteDiaryModalVisible, setdeleteDiaryModalVisible] = useState(false);
  const [deleteFinModalVisible, setdeleteFinModalVisible] = useState(false);
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setdeleteAccountModalVisible] = useState(false);
  const deleteDiaryWindow = () => setdeleteDiaryModalVisible((previousState) => !previousState);
  const logoutWindow = () => setlogoutModalVisible((previousState) => !previousState);
  const deleteAccountWindow = () => setdeleteAccountModalVisible((previousState) => !previousState);
  const drawingtoggleSwitch = () => {
    // 그림일기 기능 on off 코드 여기에 넣기
    setIsDrawingEnabled((previousState) => !previousState);
    userContext.setImageYN(isDrawingEnabled);
    async () => {
      await axios_post('drawingDiary', { userId, imageYN: isDrawingEnabled });
    };
  };
  const commenttoggleSwitch = () => {
    // 감상평 기능 on off 코드 여기에 넣기
    setIsCommentEnabled((previousState) => !previousState);
    userContext.setCommentYN(isCommentEnabled);
    async () => {
      await axios_post('comment', { userId, commentYN: isCommentEnabled });
    };
  };
  const deleteDiary = () => {
    //다이어리 삭제 코드 여기에 넣기
    setdeleteDiaryModalVisible(false);
    async () => {
      await axios_post('deleteDiary', { userId });
    };
    setdeleteFinModalVisible(true);
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
    async () => {
      await axios_post('deleteAccount', { userId });
    };
    navigation.navigate('LoginView');
  };
  const changeFont = (selectedItem, index) => {
    // 폰트 변경하는 코드 여기에 넣기
    userContext.setUserFont(Object.keys(fonts)[index]);
    async () => {
      await axios_post('font', { userId, font: userContext.userFont });
    };
  };
  const AISetting = () => {
    return (
      <SettingContainer flex={0.3}>
        <T font={userContext.userFont} style="subTitle">
          AI
        </T>
        <SettingBox flex={0.7}>
          {/*그림일기 기능 on off 설정*/}
          <SettingItem first={true}>
            <T font={userContext.userFont} style="rowText">
              그림일기 기능
            </T>
            <Pressable onPress={drawingtoggleSwitch}>
              <MaterialCommunityIcons
                name={isDrawingEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={isDrawingEnabled ? basic_theme.subColor : basic_theme.fgColor}
              />
            </Pressable>
          </SettingItem>
          {/*감상평 기능 on off 설정*/}
          <SettingItem>
            <T font={userContext.userFont} style="rowText">
              감상평 기능
            </T>
            <Pressable onPress={commenttoggleSwitch}>
              <MaterialCommunityIcons
                name={isCommentEnabled ? 'toggle-switch' : 'toggle-switch-off'}
                size={50}
                color={isCommentEnabled ? basic_theme.subColor : basic_theme.fgColor}
              />
            </Pressable>
          </SettingItem>
        </SettingBox>
      </SettingContainer>
    );
  };
  const DiarySetting = () => {
    return (
      <SettingContainer flex={0.3}>
        <T font={userContext.userFont} style="subTitle">
          ALL
        </T>
        <SettingBox flex={0.7}>
          {/*기본 폰트 설정*/}
          <SettingItem first={true}>
            <T font={userContext.userFont} style="rowText">
              기본 폰트 선택
            </T>
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
              buttonStyle={styles.dropdown}
              buttonTextStyle={{ fontFamily: userContext.userFont, color: 'white' }}
              rowStyle={styles.dropList}
              rowTextStyle={{ fontFamily: userContext.userFont, color: 'white' }}
            />
          </SettingItem>
          {/*모든 일기 삭제 설정*/}
          <SettingItem>
            <T font={userContext.userFont} style="rowText">
              모든 일기 삭제
            </T>
            <Pressable onPress={deleteDiaryWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </SettingItem>
        </SettingBox>
      </SettingContainer>
    );
  };
  const AccountSetting = () => {
    return (
      <SettingContainer flex={0.3}>
        <SettingBox flex={0.35} first={true}>
          {/*로그아웃 설정*/}
          <SettingItem>
            <T font={userContext.userFont} style="rowText">
              로그아웃
            </T>
            <Pressable onPress={logoutWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </SettingItem>
        </SettingBox>
        <SettingBox flex={0.35}>
          {/*회원탈퇴 설정*/}
          <SettingItem>
            <T font={userContext.userFont} style="rowText">
              회원탈퇴
            </T>
            <Pressable onPress={deleteAccountWindow}>
              <Entypo name="chevron-small-right" size={24} color="white" />
            </Pressable>
          </SettingItem>
        </SettingBox>
      </SettingContainer>
    );
  };
  return (
    <View style={styles.Setting}>
      <SettingContainer flex={0.1}>
        <T font={userContext.userFont}>{userContext.userName}님, 설정</T>
      </SettingContainer>
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
        font={userContext.userFont}
      />
      <ModalWindow
        open={deleteFinModalVisible}
        okPress={() => setdeleteFinModalVisible(false)}
        text2="삭제되었습니다."
        confirmText={text.backText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={logoutModalVisible}
        okPress={logout}
        cancelPress={() => setlogoutModalVisible(false)}
        text2="로그아웃 하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={deleteAccountModalVisible}
        okPress={deleteAccount}
        cancelPress={() => setdeleteAccountModalVisible(false)}
        text1="회원님에 대한 모든 정보가 삭제됩니다."
        text2="계정을 삭제하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
        font={userContext.userFont}
      />
    </View>
  );
};
const T = styled.Text`
  font-family: ${(props) => props.font};
  color: white;
  font-size: 20px;
  ${(props) =>
    (props.style === 'rowText' &&
      css`
        flex: 0.5;
        text-align: left;
      `) ||
    (props.style === 'subTitle' &&
      css`
        flex: 0.15;
        align-self: flex-start;
        padding-left: 3%;
      `)};
`;
const SettingContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: 5%;
  flex: ${(props) => props.flex};
`;
const SettingBox = styled.View`
  justify-content: space-evenly;
  border-radius: 12;
  width: 100%;
  border-color: ${basic_theme.fgColor};
  border-width: 2px;
  background-color: rgba(222, 232, 255, 0.25);
  align-items: stretch;
  flex: ${(props) => props.flex || 1};
  ${(props) =>
    props.first &&
    css`
      margin-bottom: 15px;
    `}
`;
const SettingItem = styled.View`
  padding-horizontal: 20px;
  flex: 0.5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 0.5;
  ${(props) =>
    props.first &&
    css`
      border-bottom-width: 2px;
      border-color: #dee8ff;
    `}
`;
const styles = StyleSheet.create({
  Setting: {
    backgroundColor: basic_theme.bgColor,
    flex: 1,
    paddingVertical: '10%',
  },
  dropdown: {
    backgroundColor: 'rgba(222,232,255,0.2)',
    flex: 0.4,
    borderRadius: 12,
  },
  dropList: {
    backgroundColor: basic_theme.bgColor,
  },
});
export default SettingsView;
