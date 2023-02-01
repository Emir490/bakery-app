import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { colors, globalStyles } from "../styles";
import { fadeIn, fadeOut } from "../helpers/animations";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Phone = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const animated = new Animated.Value(1);
  const animated2 = new Animated.Value(1);

  const { sendSMS, confirmCode } = useAuth();
  const navigator = useNavigation();

  const handlePhone = async () => {
    if (phone.length < 10) {
      setIsEmpty(true);
      return;
    }
    const result = await sendSMS(phone);

    if (!result.error) {
      Alert.alert(`${result.msg}`);
      setIsSend(true);
    } else {
      Alert.alert(`${result.msg}`);
    }
  };

  const handleCode = async () => {
    if (password != repeatPass) {
      Alert.alert("Las contraseñas no coinciden");
      return;
    }

    const result = await confirmCode(phone, code, password);

    if (!result.error) {
      Alert.alert(`${result.msg}`);
      navigator.goBack();
    } else {
      Alert.alert(`${result.msg}`);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[globalStyles.container, { paddingTop: 40 }]}>
        {isEmpty && <Text style={styles.alert}>Número Inválido</Text>}
        <TextInput
          style={[
            styles.input,
            { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
          ]}
          placeholder="Teléfono"
          keyboardType="numeric"
          maxLength={10}
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            setIsEmpty(text.length === 0);
          }}
        />
        <Pressable
          onPress={handlePhone}
          onPressIn={() => fadeIn(animated)}
          onPressOut={() => fadeOut(animated)}
          style={{ width: "80%" }}
        >
          <Animated.View style={[{ opacity: animated }, styles.button]}>
            <Text style={styles.buttonText}>Enviar SMS</Text>
          </Animated.View>
        </Pressable>
        {isSend && (
          <>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
              ]}
              placeholder="Código de seguridad"
              keyboardType="numeric"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
              ]}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={[
                styles.input,
                { backgroundColor: isEmpty ? "#FAC8C3" : "#FFF" },
              ]}
              placeholder="Repetir contraseña"
              secureTextEntry
              value={repeatPass}
              onChangeText={setRepeatPass}
            />
            <Pressable
              onPressIn={() => fadeIn(animated2)}
              onPressOut={() => fadeOut(animated2)}
              onPress={handleCode}
              style={{ width: "80%" }}
            >
              <Animated.View style={[{ opacity: animated2 }, styles.button]}>
                <Text style={styles.buttonText}>Restablecer contraseña</Text>
              </Animated.View>
            </Pressable>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Phone;

const styles = StyleSheet.create({
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
    marginBottom: 70,
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
