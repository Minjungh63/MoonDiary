import Modal from 'react-native-simple-modal';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getEmtionRequire, getWeatherRequire } from '../../service/SelectImage';

const FilterModal = ({ open, setModalVisible }) => {
  const closeFilter = () => {
    setModalVisible(false);
  };
  return (
    <Modal open={open} modalStyle={styles.mymodal}>
      <Text>날짜정렬</Text>
      <Text>____년 ___월 오름차순</Text>
      <Text>기분 필터</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={getEmtionRequire('angry')}></Image>
        <Image style={styles.img} source={getEmtionRequire('fear')}></Image>
        <Image style={styles.img} source={getEmtionRequire('joy')}></Image>
        <Image style={styles.img} source={getEmtionRequire('love')}></Image>
        <Image style={styles.img} source={getEmtionRequire('neutral')}></Image>
        <Image style={styles.img} source={getEmtionRequire('sad')}></Image>
        <Image style={styles.img} source={getEmtionRequire('surprised')}></Image>
        <Image style={styles.img} source={getEmtionRequire('tired')}></Image>
      </View>
      <Text>날씨 필터</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={getWeatherRequire('cloudy')}></Image>
        <Image style={styles.img} source={getWeatherRequire('little_cloudy')}></Image>
        <Image style={styles.img} source={getWeatherRequire('rainy')}></Image>
        <Image style={styles.img} source={getWeatherRequire('snowy')}></Image>
        <Image style={styles.img} source={getWeatherRequire('stormy')}></Image>
        <Image style={styles.img} source={getWeatherRequire('sunny')}></Image>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.btn} onPress={closeFilter}>
          <Text>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={closeFilter}>
          <Text>Cancle</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FilterModal;
