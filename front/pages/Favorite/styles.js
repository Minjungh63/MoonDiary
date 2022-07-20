import { StyleSheet } from 'react-native';
import { basic_theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    padding: 10,
  },
  filterView: {
    justifyContent: 'flex-end',
    flex: 0.1,
  },
  filter: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginEnd: 20,
  },
  mymodal: {
    backgroundColor: basic_theme.btnColor,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  img: {
    width: 30,
    height: 30,
  },
  btn: {
    margin: 10,
  },
});

export default styles;
