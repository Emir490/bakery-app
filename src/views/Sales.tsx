import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../styles';

const Sales = () => {
  return (
    <View style={styles.container}>
      <Text>Sales</Text>
    </View>
  )
}

export default Sales;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark
    }
});