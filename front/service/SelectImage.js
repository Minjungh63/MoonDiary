const emotion_list = {
  joy: require('../assets/img/emotion/joy.png'),
  love: require('../assets/img/emotion/love.png'),
  angry: require('../assets/img/emotion/angry.png'),
  sad: require('../assets/img/emotion/sad.png'),
  surprised: require('../assets/img/emotion/surprised.png'),
  tired: require('../assets/img/emotion/tired.png'),
  neutral: require('../assets/img/emotion/neutral.png'),
  fear: require('../assets/img/emotion/fear.png'),
};

const weather_list = {
  cloudy: require('../assets/img/weather/cloudy.png'),
  little_cloudy: require('../assets/img/weather/little_cloudy.png'),
  rainy: require('../assets/img/weather/rainy.png'),
  stormy: require('../assets/img/weather/stormy.png'),
  sunny: require('../assets/img/weather/sunny.png'),
  snowy: require('../assets/img/weather/snowy.png'),
};

export const getEmtionRequire = (emotion) => {
  //emotion string인자로 받음.
  return emotion_list[emotion];
};

export const getWeatherRequire = (weather) => {
  //weather string인자로 받음.
  return weather_list[weather];
};
