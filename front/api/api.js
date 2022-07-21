import axios from 'axios';

const baseUrl = 'http://168.188.123.158';
const subUrl = {
  login: '/user/login',
  join: '/user/join',
  selectEmotion: '/diary/write/mood',
  result: '/diary/write/result',
  favorite: '/diary/like',
  diary: '/diary/',
  write: '/diary/write',
  statistics: '/statistics',
};

//url은 string 타입 sendData는 json 형식으로 받음
export const axios_post = async (url, sendData) => {
  try {
    const response = await axios.post(`${baseUrl}${subUrl[url]}`, sendData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err) {
    console.log('post통신에러: ' + err);
  }
};

export const axios_get = async (url, sendData) => {
  try {
    return (response = await axios.get(
      `${baseUrl}${subUrl[url]}`,
      { params: sendData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ));
  } catch (err) {
    console.log('get통신에러 : ' + err);
  }
};
