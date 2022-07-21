import { StyleSheet, Dimensions } from 'react-native';
import { basic_theme } from '../../theme';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonContainer: {
    height: 200,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  headerContainer: {
    height: 100,

    alignContent: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: Dimensions.get('window').height - 500,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 50,
  },
  buttonContainer: {
    height: 200,

    justifyContent: 'flex-start',
  },
  moon: {
    width: 100,
    height: 100,
  },
  cloud: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.3,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 15,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
    textAlign: 'center',
  },
  inputText: {
    fontSize: 15,
    fontFamily: 'Gowun_Batang',
    color: basic_theme.blue,
    marginVertical: 2,
    textAlign: 'center',
  },
  inputBox: {
    minWidth: 90,
    maxWidth: 190,
    height: 37,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.blue,
    marginTop: 10,
  },
  buttonBox: {
    height: 40,
    width: 100,
    backgroundColor: basic_theme.blue,
    borderWidth: 1,
    borderColor: basic_theme.fgColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 10,
  },
});

export default style;
