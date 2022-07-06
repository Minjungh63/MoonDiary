import { useEffect, useState } from 'react';
import StackLogin from './navigation/login/StackLogin';
import InitView from './pages/InitView';
import { View } from "react-native";

export default function App() {
  // const [isLoading, setLoading] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {setLoading(true)}, 2000);
  // })
  return  (
    <View>
      <StackLogin />
    </View>
  );
}
