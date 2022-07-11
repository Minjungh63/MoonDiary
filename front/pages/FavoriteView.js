import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { basic_theme } from '../theme';
import FavoriteContents from '../components/FavoriteContents';

const FavoriteView = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <FontAwesome style={styles.filter} name="filter" size={24} color="black" />
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
});

export default FavoriteView;
