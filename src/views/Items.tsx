import { StyleSheet, View, FlatList } from 'react-native';
import useItems from '../hooks/useItems';
import Item from '../components/Item';
import { colors } from '../styles';

const Items = () => {
  const { items } = useItems();

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={items} keyExtractor={item => item._id} renderItem={({item}) => <Item item={item} />} />
    </View>
  )
}

export default Items;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deep,
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20,
  }
});