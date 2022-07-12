import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { basic_theme } from '../theme';
import FavoriteContents from '../components/FavoriteContents';
import { useState } from 'react';
import Modal from 'react-native-simple-modal';

const FavoriteView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openFilter = () => {
    setModalVisible(true);
  };
  const closeFilter = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <TouchableOpacity onPress={openFilter}>
          <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <FavoriteContents />
        <FavoriteContents />
        <FavoriteContents />
        <FavoriteContents />
        <FavoriteContents />
        <FavoriteContents />
        <FavoriteContents />
      </ScrollView>
      <Modal open={modalVisible} modalStyle={styles.mymodal}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
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

export default FavoriteView;
