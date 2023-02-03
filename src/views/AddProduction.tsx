import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import useItems from '../hooks/useItems';
import { colors } from '../styles';
import Product from '../components/Product';
import useProductions from '../hooks/useProductions';
import { IProduct } from '../interfaces/product.interface';

const AddProduction = () => {
  const [products, setProducts] = useState([] as IProduct[]);

  const { items } = useItems();
  const { addProductions } = useProductions();

  const updateProducts = (item: IProduct) => {
    const repeatProduct = products.find(product => product.itemId === item.itemId);
    
    if (repeatProduct) {
      const newProducts = products.map(product => product.itemId === item.itemId? item : product);
      setProducts(newProducts);
    } else {
      setProducts(prevItems => [...prevItems, item]);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list} data={items} keyExtractor={(item) => item._id} renderItem={({ item }) => <Product product={item} updateProducts={updateProducts} />} />
      <Pressable style={styles.button} onPress={() => addProductions(products)}>
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