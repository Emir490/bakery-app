import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { IProduction } from "../interfaces/production.interface";
import { formatDate, formatMoney } from "../helpers";
import useItems from "../hooks/useItems";
import useProductions from "../hooks/useProductions";

const ProductionList = () => {
  const navigator = useNavigation();
  const { production } = useProductions();

  const date = new Date(production.createdAt);

  const {
    _id,
    items: products,
    quantity,
    subtotal,
    total,
    salary,
  } = production;
  const { items } = useItems();

  useEffect(() => {
    navigator.setOptions({ title: `${formatDate(date)}` });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.text}>
          Cantidad: <Text style={styles.span}>{quantity} productos</Text>
        </Text>
        <Text style={styles.text}>
          Subtotal: <Text style={styles.span}>{formatMoney(subtotal)}</Text>
        </Text>
        <Text style={styles.text}>
          Total: <Text style={styles.span}>{formatMoney(total)}</Text>
        </Text>
        <Text style={styles.text}>
          Dinero conseguido:{" "}
          <Text style={styles.span}>{formatMoney(salary)}</Text>
        </Text>
      </View>
      <Text style={styles.title}>Productos Producidos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.item}
        renderItem={({ item }) => {
          const itemObj = items.find(
            (itemState) => itemState._id === item.item
          );
          const { quantity, price, tax, priceFinal, subtotal, total } = item;
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.name}>{itemObj?.name}</Text>
              <Text style={styles.description}>
                Cantidad: <Text style={styles.value}>{quantity}</Text>
              </Text>
              <Text style={styles.description}>
                Precio:{" "}
                <Text style={styles.value}>{formatMoney(Number(price))}</Text>
              </Text>
              <Text style={styles.description}>
                IEPS: <Text style={styles.value}>{tax}</Text>
              </Text>
              <Text style={styles.description}>
                Precio Final:{" "}
                <Text style={styles.value}>
                  {formatMoney(Math.round(Number(priceFinal)))}
                </Text>
              </Text>
              <Text style={styles.description}>
                Subtotal:{" "}
                <Text style={styles.value}>
                  {formatMoney(Math.round(Number(subtotal)))}
                </Text>
              </Text>
              <Text style={styles.description}>
                Total:{" "}
                <Text style={styles.value}>
                  {formatMoney(Math.round(Number(total)))}
                </Text>
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ProductionList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
    paddingHorizontal: 20,
  },
  wrapper: {
    marginBottom: 20,
    backgroundColor: colors.deep,
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  text: {
    color: colors.coffee,
    marginBottom: 5,
    fontWeight: "700",
  },
  span: {
    color: colors.dark,
    fontWeight: "700",
  },
  title: {
    color: colors.banana,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 15,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: colors.brown,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
  },
  name: {
    color: colors.banana,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
  description: {
    color: colors.coffee,
    fontWeight: "700",
  },
  value: {
    color: colors.deep,
    fontWeight: "700",
  },
});
