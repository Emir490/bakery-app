import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { colors } from "../styles";
import useItems from "../hooks/useItems";
import Detail from "../components/Detail";
import useSales from "../hooks/useSales";

const Cart = () => {
  const { items } = useItems();
  const { sale } = useSales();

  const updateItems = () => {};

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Detail item={item} updateItems={updateItems} />
        )}
      />
      <Pressable style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>
          {sale?._id ? "Guardar Cambios" : "Agregar Producción"}
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
