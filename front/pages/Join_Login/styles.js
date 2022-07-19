import { StyleSheet, Dimensions } from 'react-native';
import { basic_theme } from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
  },
  moon: {
    width: 120,
    height: 122,
    marginBottom: 20,
    marginTop: Dimensions.get('window').height / 8,
  },
  cloud: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.6,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  inputContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 15,
  },
  inputBox: {
    minWidth: 90,
    maxWidth: 190,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    marginTop: 4,
  },
  buttonBox: {
    height: 40,
    width: 100,
    borderWidth: 2,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    borderRadius: 100,
    marginTop: 10,
  },
});

export default style;
