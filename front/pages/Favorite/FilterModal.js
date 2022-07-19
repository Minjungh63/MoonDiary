import { Modal } from 'react-native-simple-modal';
import { Text, Image, View } from 'react-native';
import styles from './styles';

const FilterModal = ({ setModalVisible }) => {
  const closeFilter = () => {
    setModalVisible(false);
  };
  return (
    <Modal modalStyle={styles.mymodal}>
      <Text>날짜정렬</Text>
      <Text>____년 ___월 오름차순</Text>
      <Text>기분 필터</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={require('../assets/img/emotion/angry.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/emotion/love.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/emotion/joy.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/emotion/sad.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/emotion/surprised.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/emotion/tired.png')}></Image>
      </View>
      <Text>날씨 필터</Text>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={require('../assets/img/weather/sunny.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/weather/hot.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/weather/cloudy.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/weather/rainy.png')}></Image>
        <Image style={styles.img} source={require('../assets/img/weather/stormy.png')}></Image>
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
