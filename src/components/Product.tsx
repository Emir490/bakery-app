import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Item } from "../interfaces/item.interface";
import { colors } from "../styles";
import { useEffect, useState } from "react";
import useProductions from "../hooks/useProductions";
import { IProduct } from "../interfaces/product.interface";
import useItems from "../hooks/useItems";

interface Props {
  product: Item
  updateProducts: (product: IProduct) => void;
}

const Product = ({ product: item, updateProducts }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const { _id, name } = item;
  const { production } = useProductions();

  useEffect(() => {
    const itemObj = production._id ? production.items.find(productionState => productionState.item == _id) : null;

    if (itemObj?.item) {
      setQuantity(itemObj.quantity);
      updateProducts({item: itemObj.item, quantity: itemObj.quantity});
    }
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput style={styles.quantity} placeholder="0" keyboardType="numeric" value={quantity === 0? '' : `${quantity}`} onChangeText={(text) => {
        setQuantity(Number(text));
      }} onBlur={() => updateProducts({item: _id, quantity})} />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.banana,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: colors.banana,
  },
  quantity: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: colors.banana,
    borderRadius: 10
  },
});
