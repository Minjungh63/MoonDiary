import { View, Text, TextInput } from 'react-native';
import style from '../pages/Join_Login/styles';
import { basic_theme } from '../theme';

export const InputBox = ({ text, secureTextEntry, value, placeholder, onChangeText }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={style.text}>{text}</Text>
      <View style={style.inputBox}>
        <TextInput
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={basic_theme.blue}
          style={style.inputText}
        ></TextInput>
      </View>
    </View>
  );
};
