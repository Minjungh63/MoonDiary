import { View, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import Modal from 'react-native-simple-modal';
import { basic_theme } from '../theme';
import { useState } from 'react';
import styled from 'styled-components/native';
import { getEmotionRequire } from '../service/SelectImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const ModalWindow = ({
  open,
  okPress,
  cancelPress,
  title,
  text1,
  text2,
  confirmText,
  cancelText,
  font,
  emotions,
  setEmotion,
}) => {
  const [isFocus, setIsFocus] = useState('');
  return (
    <Modal open={open} modalStyle={styles.modal}>
      <View style={styles.textContainer}>
        {title && (
          <T font={font} title={true}>
            {title}
          </T>
        )}
        {text1 && <T font={font}>{text1}</T>}
        <T font={font} emotions={emotions}>
          {text2}
        </T>
      </View>
      {emotions && (
        <View style={styles.emotionContainer}>
          {emotions.map((emotion, index) => (
            <TouchableOpacity
              onPress={() => {
                setEmotion(emotion);
                setIsFocus(emotion);
              }}
              style={styles.emotionBox}
              key={index}
            >
              <Image source={getEmotionRequire(emotion)} style={isFocus !== emotion && styles.emotion}></Image>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.modalButtons}>
        <Pressable onPress={okPress}>
          <View style={styles.modalButton}>
            <T font={font}>{confirmText}</T>
          </View>
        </Pressable>
        {cancelText && (
          <Pressable onPress={cancelPress}>
            <View style={styles.modalButton}>
              <T font={font}>{cancelText}</T>
            </View>
          </Pressable>
        )}
      </View>
    </Modal>
  );
};
const T = styled.Text`
  font-family: ${(props) => props.font};
  color: white;
  text-align: center;
  font-size: ${(props) => (props.title && 25) || 18}px;
  margin-bottom: ${(props) => (props.title && 20) || (props.emotions && 0) || 5}px;
`;
const styles = StyleSheet.create({
  modal: {
    backgroundColor: basic_theme.blue,
    flex: 0.3,
    alignItems: 'stretch',
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.85,
  },
  textContainer: {
    flex: 0.6,
    marginTop: '10%',
    justifyContent: 'center',
  },
  modalButtons: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 0.4,
  },
  modalButton: {
    borderRadius: 100,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: basic_theme.bgColor,
    width: 90,
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  emotionBox: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    resizeMode: 'contains',
  },
  emotion: { opacity: 0.5 },
});
