import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  SectionList,
} from "react-native";
import { colors } from "../styles";
import useUsers from "../hooks/useUsers";
import Employee from "../components/Employee";

const Employees = () => {
  const { users } = useUsers();

  const admins = users.filter((user: any) => user.position === 'admin');
  const employees = users.filter((user: any) => user.position !== 'admin');

  const DATA = [
    {
      title: 'Admin',
      data: admins
    },
    {
      title: 'Empleados',
      data: employees
    }
  ];

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.list}
        sections={DATA}
        renderItem={({ item }) => <Employee userObj={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.text}>{title}</Text>
        )}
      />
    </View>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deep,
  },
  list: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  text: {
    color: colors.brown,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20
  }
});
