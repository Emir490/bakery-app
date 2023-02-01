import { StyleSheet, Text, Pressable, Alert } from "react-native";
import { User } from "../interfaces/user.interface";
import { colors } from "../styles";
import useUsers from "../hooks/useUsers";
import { useNavigation } from "@react-navigation/native";
import { AddScreenNavigationProp } from "../types/navigation";

interface Props {
  userObj: User;
}

const Employee = ({ userObj }: Props) => {
  const { user, name, phone, position, salary } = userObj;

  const { setUser, setModal, deleteUser } = useUsers();
  const { navigate } = useNavigation<AddScreenNavigationProp>();

  return (
    <Pressable style={styles.container} onPress={() => {
      setModal(false);
      setUser(userObj);
      navigate('Add');
    }} onLongPress={() => {
      Alert.alert("Acción Irreversible", "¿Estás seguro de querer eliminar este empleado?", [
        {
          text: "Eliminar",
          onPress: () => deleteUser(`${userObj._id}`)
        },
        {
          text: "Cancelar"
        }
      ])
    }}>
      <Text style={styles.text}>
        <Text style={styles.label}>Usuario: </Text>
        {user}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Nombre: </Text>
        {name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Teléfono: </Text>
        {phone.substring(3)}
      </Text>
      {position !== "admin" && (
        <>
          <Text style={styles.text}>
            <Text style={styles.label}>Salario: </Text>
            {salary}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Puesto: </Text>
            {position}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default Employee;

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
