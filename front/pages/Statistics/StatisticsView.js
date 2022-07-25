import React, { useState, useEffect, useContext } from 'react';
import { basic_theme } from '../../theme';
import { getEmotionRequire } from '../../service/SelectImage';
import WritingRate from '../../components/WritingRate';
import EmotionRate from '../../components/EmotionRate';
import EmotionTable from '../../components/EmotionTable';
import { axios_get } from '../../api/api';
import UserContext from '../../service/UserContext';
import styled from 'styled-components/native';

const StatisticsView = () => {
  useEffect(() => {
    (async () => {
      const response = await axios_get('statistics', { userId });
      if (response.status == 200) {
        setEmotion_day(response.data);
      }
    })();
  }, []);
  const userContext = useContext(UserContext);
  const userId = userContext.userId;
  const [emotion_day, setEmotion_day] = useState([]);
  const attend_day = emotion_day.map((emotion) => emotion.day).reduce((prev, curr) => prev + curr, 0); // 작성 일 수
  const getDay = (id) => {
    return emotion_day.filter((list) => list.emotion === id).map((emotion) => emotion.day);
  }; // emotion이 나온 일 수
  const emotion_list = [
    {
      text: '기쁨',
      day: getDay('joy'),
      color: '#FBEC6B',
      image: getEmotionRequire('joy'),
    },
    {
      text: '사랑',
      day: getDay('love'),
      color: '#FFCDE0',
      image: getEmotionRequire('love'),
    },
    {
      text: '화남',
      day: getDay('anger'),
      color: '#F07C89',
      image: getEmotionRequire('anger'),
    },
    {
      text: '슬픔',
      day: getDay('sadness'),
      color: '#969ECF',
      image: getEmotionRequire('sadness'),
    },
    {
      text: '놀람',
      day: getDay('surprise'),
      color: '#AE98D6',
      image: getEmotionRequire('surprise'),
    },
    {
      text: '지침',
      day: getDay('tired'),
      color: '#DADADA',
      image: getEmotionRequire('tired'),
    },
    {
      text: '평온',
      day: getDay('neutral'),
      color: '#98D5A2',
      image: getEmotionRequire('neutral'),
    },
    {
      text: '공포',
      day: getDay('fear'),
      color: '#999999',
      image: getEmotionRequire('fear'),
    },
  ];
  emotion_list.sort((a, b) => b.day - a.day); // emotion이 나온 일수를 기준으로 내림차순 정렬
  return (
    <Statistics>
      <Component flex={0.55}>
        <T font={userContext.userFont}>다이어리 작성 비율</T>
        <WritingRate attend_day={attend_day} font={userContext.userFont} />
      </Component>
      <Component flex={0.15}>
        <T font={userContext.userFont}>기분 비율</T>
        <EmotionRate attend_day={attend_day} emotion_list={emotion_list} font={userContext.userFont} />
      </Component>
      <Component flex={0.3}>
        <T font={userContext.userFont}>기분 순위</T>
        <T font={userContext.userFont} subText={true}>
          이번 달에 자주 경험한 기분 순위를 볼 수 있어요.
        </T>
        <EmotionTable attend_day={attend_day} emotion_list={emotion_list} font={userContext.userFont} />
      </Component>
    </Statistics>
  );
};
const T = styled.Text`
  font-family: ${(props) => props.font};
  color: white;
  font-size: ${(props) => (props.subText && 13) || 20}px;
  padding-bottom: ${(props) => (props.subText && 15) || 5}px;
`;
const Component = styled.View`
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  flex: ${(props) => props.flex};
`;
const Statistics = styled.View`
  background-color: ${basic_theme.bgColor};
  padding: 10px;
  flex: 1;
`;
export default StatisticsView;
