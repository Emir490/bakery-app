import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import useItems from '../hooks/useItems';
import { colors } from '../styles';
import Product from '../components/Product';
import useProductions from '../hooks/useProductions';

const AddProduction = () => {
  const { items } = useItems();
  const { items: products, addProduction } = useProductions();

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={items} keyExtractor={(item) => item._id} renderItem={({ item }) => <Product product={item} />} />
      <Pressable style={styles.button} onPress={() => console.log(products)      
      }>
        <Text style={styles.buttonText}>Agregar Producción</Text>
      </Pressable>
    </View>
  )
}

export default AddProduction

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20
  },
  button: {
    padding: 20,
    backgroundColor: colors.banana
  },
  buttonText: {
    textAlign: 'center'
  }
});