import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../styles";
import { fadeIn, fadeOut } from "../helpers/animations";
import Alert from "../components/Alert";
import { ListScreenNavigationProp } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  msg: string;
  error: boolean;
}

const AddUser = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState(0);
  const [userError, setUserError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [salaryError, setSalaryError] = useState(false);
  const [position, setPosition] = useState("");
  const [fixSalary, setFixSalary] = useState(false);
  const [alert, setAlert] = useState({} as Props);

  const { user: userObj, addUser, updateUser } = useUsers();
  const navigation = useNavigation<ListScreenNavigationProp>();
  const animated = new Animated.Value(0);

  const { msg } = alert;

  const color = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.dark, "#562A22"],
  });

  useEffect(() => {
    if (userObj._id) {
      setUser(userObj.user);
      setName(userObj.name);
      setPhone(userObj.phone.substring(3));
      setPosition(`${userObj.position}`);
      setSalary(Number(userObj.salary));

      const flag =
        userObj.position === "cajero" || userObj.position === "talachero"
          ? true
          : false;
      setFixSalary(flag);
    }
  }, []);

  const handleAdd = async () => {
    if (
      [name, user, phone, position].includes("") ||
      (salary === 0 && fixSalary)
    ) {
      const empty = user.length == 0 ? true : false;
      const empty2 = name.length == 0 ? true : false;
      const empty3 = phone.length == 0 ? true : false;

      setUserError(empty);
      setNameError(empty2);
      setPhoneError(empty3);

      if (name != "" && user != "" && phone != "" && salary != 0) {
        setAlert({
          error: true,
          msg: "Seleccione una posición",
        });
      } else if (salary === 0 && fixSalary) {
        setAlert({
          error: true,
          msg: "Salario inválido",
        });
      } else {
        setAlert({
          error: true,
          msg: "Todos los campos son obligatorios",
        });
      }

      setTimeout(() => {
        setAlert({ error: false, msg: "" });
      }, 3000);
      return;
    }
    if (phone.length < 10) {
      setPhoneError(true);
      setAlert({
        error: true,
        msg: "Número inválido",
      });

      setTimeout(() => {
        setAlert({ error: false, msg: "" });
      }, 3000);
      return;
    }

    let result;
    const obj = {
      user,
      name,
      phone: `+52${phone}`,
      position,
      salary: Number(salary),
    };

    if (userObj._id) {
      result = await updateUser(userObj._id, obj);
    } else {
      result = await addUser(obj);
    }

    if (!result) {
      navigation.navigate("List");
    } else {
      setAlert({
        error: true,
        msg: result,
      });
      setTimeout(() => {
        setAlert({ error: false, msg: "" });
      }, 3000);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView onTouchStart={Keyboard.dismiss}>
        <View style={styles.cancelContainer}>
        <Text style={styles.title}>
              {userObj._id ? "Editar Empleado" : "Nuevo Empleado"}
            </Text>
          <TouchableOpacity style={styles.cancel} onPress={navigation.goBack}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {msg && <Alert msg={alert.msg} error={alert.error} />}
          <View style={styles.field}>
            <Text style={styles.label}>Usuario:</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: userError ? "#E39282" : colors.deep },
              ]}
              placeholder="Usuario único"
              value={user}
              onChangeText={(text) => {
                setUser(text);
                setUserError(text.length === 0);
              }}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: nameError ? "#E39282" : colors.deep },
              ]}
              placeholder="Nombre del empleado"
              value={name}
              onChangeText={(text) => {
                setName(text);
                setNameError(text.length === 0);
              }}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: phoneError ? "#E39282" : colors.deep },
              ]}
              placeholder="Número del empleado"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                setPhoneError(text.length === 0);
              }}
              maxLength={10}
              keyboardType="phone-pad"
            />
          </View>
          {fixSalary && (
            <View style={styles.field}>
              <Text style={styles.label}>Salario:</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: salaryError ? "#E39282" : colors.deep },
                ]}
                placeholder="Salario diario del empleado"
                value={salary ? `${salary}` : ""}
                onChangeText={(text) => {
                  setSalary(Number(text));
                  setSalaryError(text.length === 0);
                }}
                keyboardType="number-pad"
              />
            </View>
          )}
          <View style={styles.field}>
            <Text style={styles.label}>Posición:</Text>
            <Picker
              selectedValue={position}
              onValueChange={(positionValue) => {
                const flag =
                  positionValue === "cajero" || positionValue === "talachero"
                    ? true
                    : false;
                setFixSalary(flag);
                setPosition(positionValue);
              }}
            >
              <Picker.Item label="--Seleccione--" value="" />
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Panadero" value="panadero" />
              <Picker.Item label="Cajero" value="cajero" />
              <Picker.Item label="Pastelero" value="pastelero" />
              <Picker.Item label="Talachero" value="talachero" />
            </Picker>
          </View>
          <Pressable
            onPress={handleAdd}
            onPressIn={() => fadeIn(animated)}
            onPressOut={() => fadeOut(animated)}
          >
            <Animated.View style={[{ backgroundColor: color }, styles.button]}>
              <Text style={styles.buttonText}>
                {userObj._id ? "Guardar Cambios" : "Agregar Empleado"}
              </Text>
            </Animated.View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.brown,
    paddingTop: 30,
  },
  titleContainer: {
    width: '80%'
  },
  title: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
    textTransform: "uppercase",
    fontSize: 18,
    width: '80%'
  },
  cancelContainer: {
    flexDirection: "row-reverse",
    justifyContent: 'center'
  },
  cancel: {
    backgroundColor: colors.banana,
    borderRadius: 50,
    alignSelf: 'center',
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
