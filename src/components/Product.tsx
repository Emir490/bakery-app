import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Item } from "../interfaces/item.interface";
import { colors } from "../styles";
import { useState } from "react";
import useProductions from "../hooks/useProductions";

interface Props {
  product: Item;
}

const Product = ({ product }: Props) => {
  const [quantity, setQuantity] = useState(0);

  const { _id, name } = product;
  const { items, setItems } = useProductions();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <TextInput keyboardType="numeric" value={`${quantity}`} onChangeText={(text) => {
        setQuantity(Number(text));
        setItems([...items, { _id, quantity: Number(text) }])
      }} />
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
    flexDirection: "row",
  },
});
