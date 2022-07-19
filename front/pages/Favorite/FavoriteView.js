import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FavoriteContents from '../../components/FavoriteContents';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios_get } from '../../api/api';
import styles from './styles';
import FilterModal from './FilterModal';

const FavoriteView = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [favData, setFavData] = useState([]);
  const openFilter = () => {
    setModalVisible(true);
  };
  const getFavorData = () => {
    AsyncStorage.getItem('userId')
      .then(async (value) => {
        try {
          const userId = value.replace('"', '').replace('"', '');
          const response = await axios_get('favorite', { userId });
          if (response.status === 200) {
            response.data.sort(function (a, b) {
              return new Date(b.date) - new Date(a.date);
            });
            setFavData(() => response.data);
          }
        } catch (e) {
          console.log('통신에러 : ' + e);
        }
      })
      .catch((e) => console.log('userID 에러 : ' + e));
  };
  useEffect(() => {
    getFavorData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <TouchableOpacity onPress={openFilter}>
          <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {favData.map((obj, index) => {
          return (
            <FavoriteContents
              key={index}
              diaryId={obj.diaryId}
              date={obj.date}
              title={obj.title}
              weather={obj.weather}
              emotion={obj.emotion}
              comment={obj.comment}
            />
          );
        })}
      </ScrollView>
      {modalVisible ? <FilterModal setModalVisible={setModalVisible} /> : null}
    </View>
  );
};

export default FavoriteView;
