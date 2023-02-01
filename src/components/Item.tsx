import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import useUsers from "../hooks/useUsers";
import useItems from "../hooks/useItems";
import { Item as IItem } from "../interfaces/item.interface";
import { useNavigation } from "@react-navigation/native";
import { AddItemScreenNavigationProp } from "../types/navigation";

interface Props {
  item: IItem;
}

const Item = ({ item }: Props) => {
  const { _id, name, price, type, area } = item;

  const { setModal } = useUsers();
  const { setItem, deleteItem } = useItems();
  const { navigate } = useNavigation<AddItemScreenNavigationProp>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setModal(false);
        setItem(item);
        navigate("AddItem");
      }}
      onLongPress={() => {
        Alert.alert(
          "Acción Irreversible",
          "¿Estás seguro de querer eliminar este artículo?",
          [
            {
              text: "Eliminar",
              onPress: () => deleteItem(`${_id}`),
            },
            {
              text: "Cancelar",
            },
          ]
        );
      }}
    >
      <Text style={styles.text}>
        <Text style={styles.label}>Artículo: </Text>
        {name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Precio: </Text>
        {price}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Tipo: </Text>
        {type}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Área: </Text>
        {area}
      </Text>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: colors.banana,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  label: {
    color: colors.brown,
    fontWeight: "700",
  },
  text: {
    textTransform: "capitalize",
    marginBottom: 10,
  },
});
