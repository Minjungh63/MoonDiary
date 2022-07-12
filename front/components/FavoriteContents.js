import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { basic_theme } from '../theme';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

export default function FavoriteContents() {
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.line}>
        <Text style={styles.text}>2022년 07월 11일</Text>
        <Image source={require('../assets/img/emotion/sad.png')} style={styles.image}></Image>
        <Image source={require('../assets/img/weather/stormy.png')} styles={styles.image}></Image>
      </View>
      <View style={{ ...styles.line, justifyContent: 'space-between' }}>
        <Text style={styles.text}>일기 제목 - 내 맘도 날씨 따라</Text>
        <TouchableOpacity style={{ marginRight: 5 }}>
          <FontAwesome name="star" size={24} color="yellow" />
        </TouchableOpacity>
      </View>
      <View style={styles.line}>
        <Text style={styles.text}>AI 평가 - 내일은 밝은 날이 될꺼에요!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: 'black',
    backgroundColor: basic_theme.fgColor,
    margin: 8,
  },
  text: {
    fontFamily: 'Gowun_Batang',
    fontSize: 16,
  },
  line: {
    flexDirection: 'row',
    margin: 6,
  },
  image: {
    width: 25,
    height: 25,
    marginHorizontal: 6,
  },
});
