import { View, StyleSheet, Text, Pressable } from 'react-native';
import Modal from 'react-native-simple-modal';
import { basic_theme } from '../theme';

export const ModalWindow = ({ open, okPress, cancelPress, title, text1, text2, confirmText, cancelText }) => {
  return (
    <Modal open={open} modalStyle={styles.modal}>
      <View style={styles.textContainer}>
        {title && <Text style={styles.modalTitle}>{title}</Text>}
        {text1 && <Text style={styles.modalText}>{text1}</Text>}
        <Text style={styles.modalText}>{text2}</Text>
      </View>
      <View style={styles.modalButtons}>
        <Pressable onPress={okPress}>
          <View style={styles.modalButton}>
            <Text style={styles.modalText}>{confirmText}</Text>
          </View>
        </Pressable>
        {cancelText && (
          <Pressable onPress={cancelPress}>
            <View style={styles.modalButton}>
              <Text style={styles.modalText}>{cancelText}</Text>
            </View>
          </Pressable>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    backgroundColor: basic_theme.blue,
    flex: 0.35,
    alignItems: 'stretch',
    justifyContent: 'center',
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
  modalTitle: {
    fontSize: 30,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'Gowun_Batang',
    color: 'white',
    textAlign: 'center',
  },
  modalButton: {
    borderRadius: 100,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: basic_theme.bgColor,
    width: 100,
  },
});
