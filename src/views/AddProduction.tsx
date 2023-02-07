import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import useItems from "../hooks/useItems";
import { colors } from "../styles";
import Product from "../components/Product";
import useProductions from "../hooks/useProductions";
import { IProduct } from "../interfaces/product.interface";
import { useNavigation } from "@react-navigation/native";
import { ProductionNavigationProp } from "../types/navigation";
import { Item } from "../interfaces/item.interface";

const AddProduction = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [products, setProducts] = useState([] as IProduct[]);
  const navigator = useNavigation<ProductionNavigationProp>();

  const screenName = navigator.getParent()?.getState();
  const screen = screenName?.index === 0 ? "panaderia" : "pasteleria";

  const { items } = useItems();
  const { production, addProductions, editProduction } = useProductions();

  useEffect(() => {
    const updatedItems = items.filter(itemState => itemState.area === screen);

    setItemsList(updatedItems);
  }, [])

  const updateProducts = (item: IProduct) => {
    const repeatProduct = products.find(
      (product) => product.item === item.item
    );

    if (repeatProduct) {
      const newProducts = products.map((product) =>
        product.item === item.item ? item : product
      );
      setProducts(newProducts);
    } else {
      setProducts((prevItems) => [...prevItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={itemsList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Product product={item} updateProducts={updateProducts} />
        )}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          if (production._id) {
            editProduction(production._id, { items: products });
          } else {
            addProductions({ items: products, area: screen });
          }
          
          navigator.goBack();
        }}
      >
        <Text style={styles.buttonText}>
          {production?._id ? "Guardar Cambios" : "Agregar Producción"}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddProduction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    padding: 20,
    backgroundColor: colors.banana,
    borderRadius: 15,
    margin: 20,
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
