import { StyleSheet, Text, Pressable, Alert } from "react-native";
import { IProduction } from "../interfaces/production.interface";
import { colors } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { AddProductionNavigationProp, PastryProductionNavigationProp } from "../types/navigation";
import { formatDate, formatMoney } from "../helpers";
import { useActionSheet } from '@expo/react-native-action-sheet';
import useProductions from "../hooks/useProductions";

interface Props {
  production: IProduction;
}

const Production = ({ production }: Props) => {
  const date = new Date(production.createdAt);
  const hours = date.getHours();

  const { deleteProduction, setProduction } = useProductions();
  const navigator = useNavigation<any>();
  const screen = navigator.getParent()?.getState().index;
  
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        setProduction(production);
        if (screen === 0) {
          navigator.navigate("AddProduction");
        } else {
          navigator.navigate("NewProduction");
        }
      }}
      onLongPress={() => {
        const options = ['Ver Producción', 'Eliminar', 'Cancelar'];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
          userInterfaceStyle: 'dark'
        }, (selectedIndex: number | undefined) => {
          switch (selectedIndex) {
            case 0:
              setProduction(production);
              if (screen === 0) {
                navigator.navigate("ProductionList");
              } else {
                navigator.navigate("ProductionInfo");
              }
              break;

            case 1: 
              Alert.alert('Acción Irreversible', '¿Estás seguro de querer eliminar esta producción', [
                {
                  text: 'Cancelar'
                },
                {
                  text: 'Eliminar',
                  onPress: () => deleteProduction(production._id)
                }
              ])
              break;
          }
        })
      }}
    >
      <Text style={styles.title}>Producción del {formatDate(date)}</Text>
        <Text style={styles.text}>
          Turno:{" "}
          <Text style={styles.span}>{hours < 14 ? "Mañana" : "Tarde"}</Text>
        </Text>
        <Text>
          Cantidad de productos:{" "}
          <Text style={styles.span}>{production.quantity}</Text>
        </Text>
        <Text>
          Dinero ganado:{" "}
          <Text style={styles.span}>
            {formatMoney(production.salary)} Pesos
          </Text>
        </Text>
    </Pressable>
  );
};

export default Production;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: colors.deep,
    borderRadius: 15,
  },
  title: {
    fontWeight: "700",
    color: colors.brown,
    marginBottom: 10,
  },
  text: {
    color: colors.dark,
  },
  span: {
    color: colors.coffee,
    fontWeight: "700",
  },
});
