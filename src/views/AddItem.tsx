import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import { ItemsScreenNavigationProp } from "../types/navigation";
import { RadioButtonProps } from "react-native-radio-buttons-group";
import { fadeIn, fadeOut } from "../helpers/animations";
import RadioGroup from "react-native-radio-buttons-group/lib/RadioGroup";
import useItems from "../hooks/useItems";
import useUsers from "../hooks/useUsers";

interface Props {
  msg: string;
  error: boolean;
}

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<RadioButtonProps[]>([
    {
      id: "1",
      label: "Dulce",
      value: "dulce",
    },
    {
      id: "2",
      label: "Blanco",
      value: "blanco",
    },
  ]);
  const [area, setArea] = useState<RadioButtonProps[]>([
    {
      id: "1",
      label: "Panadería",
      value: "panaderia",
    },
    {
      id: "2",
      label: "Pastelería",
      value: "pasteleria",
    },
  ]);
  const [alert, setAlert] = useState({} as Props);

  const animated = new Animated.Value(0);
  const navigation = useNavigation<ItemsScreenNavigationProp>();
  const { item, addItem, updateItem } = useItems();

  const { msg } = alert;

  const color = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.dark, "#562A22"],
  });

  useEffect(() => {
    if (item._id) {
      setName(item.name);
      setPrice(item.price);
      item.type === "dulce"
        ? (category[0].selected = true)
        : (category[1].selected = true);
      item.area === "panaderia"
        ? (area[0].selected = true)
        : (area[1].selected = true);
    }
  }, []);

  const handleAdd = async () => {
    if (
      [name, price].includes("") ||
      [area[0].selected, category[0].selected].includes(undefined)
    ) {
      setAlert({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setAlert({} as Props);
      }, 3000);
      return;
    }

    const categoryValue = category[0].selected ? "dulce" : "blanco";
    const areaValue = area[0].selected ? "panaderia" : "pasteleria";

    let result;

    if (item._id) {
      result = await updateItem(item._id, {
        _id: item._id,
        name,
        price,
        type: categoryValue,
        area: areaValue,
      });
    } else {
      result = await addItem({
        _id: item._id,
        name,
        price,
        type: categoryValue,
        area: areaValue,
      });
    }

    if (!result) {
      navigation.navigate("ItemList");
    } else {
      setAlert({
        error: true,
        msg: result,
      });
      setTimeout(() => {
        setAlert({} as Props);
      }, 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <View style={styles.cancelContainer}>
          <Text style={styles.title}>
            {item._id ? "Editar Artículo" : "Nuevo Artículo"}
          </Text>
          <TouchableOpacity style={styles.cancel} onPress={navigation.goBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {msg && <Alert msg={alert.msg} error={alert.error} />}
          <View style={styles.field}>
            <Text style={styles.label}>Artículo: </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del artículo"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Precio:</Text>
            <TextInput
              style={styles.input}
              placeholder="Precio del artículo"
              value={price !== 0 ? `${price}` : ""}
              onChangeText={(text) => {
                setPrice(Number(text));
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Tipo:</Text>
            <RadioGroup
              radioButtons={category}
              onPress={setCategory}
              layout="row"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Área:</Text>
            <RadioGroup radioButtons={area} onPress={setArea} layout="row" />
          </View>
          <Pressable
            onPress={handleAdd}
            onPressIn={() => fadeIn(animated)}
            onPressOut={() => fadeOut(animated)}
          >
            <Animated.View style={[{ backgroundColor: color }, styles.button]}>
              <Text style={styles.buttonText}>
                {item._id ? "Guardar Cambios" : "Agregar Artículo"}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.brown,
    paddingTop: 30,
  },
  titleContainer: {
    width: "80%",
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 18,
    width: "80%",
  },
  cancelContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  cancel: {
    backgroundColor: colors.banana,
    borderRadius: 50,
    alignSelf: "center",
    padding: 2,
  },
  container: {
    marginHorizontal: 15,
    backgroundColor: colors.banana,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 10,
    color: colors.brown,
  },
  input: {
    backgroundColor: colors.deep,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderRadius: 15,
  },
  button: {
    padding: 20,
    borderRadius: 15,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
