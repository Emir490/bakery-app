import { StyleSheet, Text, View, FlatList, Pressable, Alert } from "react-native";
import { colors } from "../styles";
import useItems from "../hooks/useItems";
import Detail from "../components/Detail";
import useSales from "../hooks/useSales";
import { useState } from "react";
import { formatMoney } from "../helpers";
import { Cart as ICart } from "../interfaces/cart.interface";
import { Sale } from "../interfaces/sale.interface";

const Cart = () => {
  const [finalUnits, setFinalUnits] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [products, setProducts] = useState<Sale[]>([]);
  const [sales, setSales] = useState<ICart[]>([]);

  const { items } = useItems();
  const { sale, addSale } = useSales();

  const updateItems = (sale: Sale) => {
    const repeatSale = products.find((product) => product._id === sale._id);

    if (repeatSale) {
      const updatedSales = products.map((product) =>
        product._id === sale._id ? sale : product
      );
      setProducts(updatedSales);
    } else {
      setProducts((prevProducts) => [...prevProducts, sale]);
    }
  };

  const handleOnPress = () => {
    if (!products) {
      Alert.alert('Alerta', 'Agrega al menos una venta');
    } else {
      addSale({ items: products, units: finalUnits, total: finalPrice });
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Detail
            item={item}
            setFinalUnits={setFinalUnits}
            setFinalPrice={setFinalPrice}
            updateItems={updateItems}
          />
        )}
      />
      <View style={styles.wrapper}>
        <Text style={styles.units}>
          Unidades totales: <Text style={styles.unitsSpan}>{finalUnits}</Text>
        </Text>
        <Text style={styles.total}>
          Monto total:{" "}
          <Text style={styles.totalSpan}>{formatMoney(finalPrice)}</Text>
        </Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={handleOnPress}
      >
        <Text style={styles.buttonText}>
          {sale?._id ? "Guardar Cambios" : "Agregar Venta"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  units: {
    color: colors.deep,
    marginBottom: 10,
  },
  total: {
    color: colors.deep,
  },
  unitsSpan: {
    color: colors.deep,
    fontWeight: "700",
  },
  totalSpan: {
    color: colors.deep,
    fontWeight: "700",
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
    color: colors.brown,
  },
});
