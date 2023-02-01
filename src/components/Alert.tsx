import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles';

interface Props {
    msg: string,
    error: boolean
}

const Alert = ({msg, error} : Props) => {
  return (
    <View style={[styles.container, {backgroundColor: error ? '#C2341A' : '#56B343'}]}>
      <Text style={styles.text}>{msg}</Text>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 15,
        marginBottom: 20
    },
    text: {
        color: colors.banana,
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})