import Modal from 'react-native-simple-modal';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { getEmotionRequire, getWeatherRequire } from '../../service/SelectImage';

const FilterModal = ({ open, setModalVisible }) => {
  const emotion_img = ['angry', 'fear', 'joy', 'love', 'neutral', 'sad', 'surprised', 'tired'];
  const weather_img = ['sunny', 'cloudy', 'little_cloudy', 'rainy', 'stormy', 'snowy'];
  const closeFilter = () => {
    setModalVisible(false);
  };
  return (
    <Modal open={open} modalStyle={styles.mymodal}>
      <Text>날짜정렬</Text>
      <Text>____년 ___월 오름차순</Text>
      <Text>기분 필터</Text>
      <View style={styles.imgContainer}>
        {emotion_img.map((value, index) => {
          return <Image key={index} style={styles.img} source={getEmotionRequire(value)}></Image>;
        })}
      </View>
      <Text>날씨 필터</Text>
      <View style={styles.imgContainer}>
        {weather_img.map((value, index) => {
          return <Image key={index} style={styles.img} source={getWeatherRequire(value)}></Image>;
        })}
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
