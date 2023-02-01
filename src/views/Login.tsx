import {
  Image,
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { globalStyles, colors } from "../styles";
import logo from "../img/logo.png";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../types/navigation";
import { fadeIn, fadeOut } from "../helpers/animations";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const animated = new Animated.Value(1);

  const { login } = useAuth();
  const navigator = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if ([user, password].includes("")) {
      setIsEmpty(true);
      return;
    }
    
    const response = await login(user, password);
    
    if (!response.token) {
      Alert.alert(`${response}`)
    } 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <View style={styles.wrapper}>
          <Image style={styles.image} source={logo} />
        </View>
        <View style={styles.container}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
            ]}
            placeholder="Usuario"
            onChangeText={(text) => {
              setUser(text);
              setIsEmpty(text.length === 0);
            }}
            value={user}
          />
          {isEmpty && <Text style={styles.alert}>Ingresa tu usuario</Text>}
          <TextInput
            style={[
              styles.input,
              { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
            ]}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {isEmpty && <Text style={styles.alert}>Ingresa tu contraseña</Text>}
          <Pressable
            style={{ width: "80%" }}
            onPressIn={() => fadeIn(animated)}
            onPressOut={() => fadeOut(animated)}
            onPress={handleLogin}
          >
            <Animated.View style={[{ opacity: animated }, styles.button]}>
              <Text style={styles.buttonText}>Inicia Sesión</Text>
            </Animated.View>
          </Pressable>
          <Button
            title="Crear o reiniciar contraseña"
            onPress={() => navigator.navigate("Phone")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
  },
  container: {
    marginHorizontal: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
  },
  input: {
    padding: 15,
    marginTop: 10,
    width: "80%",
    borderRadius: 15,
    marginBottom: 10,
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    padding: 15,
    width: "100%",
    borderRadius: 15,
    marginBottom: 30,
    backgroundColor: colors.banana,
    elevation: 5,
  },
  buttonText: {
    textAlign: "center",
    color: colors.brown,
    fontWeight: "700",
  },
  alert: {
    color: "#FB4634",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});
