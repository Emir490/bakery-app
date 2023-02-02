import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styles'

const Production = () => {
  return (
    <View style={styles.container}>
      <Text>Production</Text>
    </View>
  )
}

export default Production

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
})