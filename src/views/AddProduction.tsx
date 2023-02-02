import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useItems from '../hooks/useItems';
import { colors } from '../styles';

const AddProduction = () => {
  const { items } = useItems();

  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  )
}

export default AddProduction

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.deep,
    flex: 1
  }
});