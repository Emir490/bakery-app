import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../styles";
import { Item } from "../interfaces/item.interface";
import { useEffect, useState } from "react";
import { formatMoney } from "../helpers";
import { AntDesign } from '@expo/vector-icons';

interface Props {
  item: Item;
  updateItems: () => void;
}

const Detail = ({ item, updateItems }: Props) => {
    const [quantity, setQuantity] = useState(0);
    const [units, setUnit] = useState(0);
    const [flag, setFlag] = useState(false);
    const [disable, setDisable] = useState(false);
    const { name, units: unit, price } = item;

    useEffect(() => {
      setUnit(Number(unit));
    }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>Unidades: {units}</Text>
        <Text style={[styles.text, {marginBottom: 0}]}>{formatMoney(price)}</Text>
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} disabled={flag} onPress={() => {
          if (quantity) {
            setFlag(false);
            setQuantity(quantity - 1);
            setUnit(Number(units) + 1);
          } else {
            setFlag(true);
          }
        }}>
            <AntDesign name="minuscircle" size={24} color={colors.banana} />
        </TouchableOpacity>
        <View style={styles.quantity}>
          <Text style={styles.quantityText}>{quantity}</Text>
        </View>
        <TouchableOpacity style={styles.button} disabled={disable} onPress={() => {
          if (units) {
            setDisable(false);
            setQuantity(quantity + 1)
            setUnit(Number(units) - 1);
          } else {
            setDisable(true);
          }

        }}>
            <AntDesign name="pluscircle" size={24} color={colors.banana} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Detail;

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
    marginBottom: 10
  },
  quantity: {
    backgroundColor: colors.banana,
    marginHorizontal: 10,
    padding: 10,
    marginTop: 15,
    borderRadius: 50,
    maxHeight: 30
  },
  quantityText: {
    fontSize: 18,
    height: 30,
    top: -8
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    marginTop: 20
  }
});