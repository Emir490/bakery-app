import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../styles'
import useProductions from '../hooks/useProductions'
import Production from '../components/Production'
import { useNavigation } from '@react-navigation/native'
import { IProduction } from '../interfaces/production.interface'

const Productions = () => {
  const [production, setProduction] = useState([] as IProduction[]);

  const { productions } = useProductions();
  const navigator = useNavigation();

  useEffect(() => {
    const route = navigator.getParent()?.getState().index === 0? 'panaderia' : 'pasteleria';
    
    const filterProductions = productions.filter(productionState => productionState.area === route);

    setProduction(filterProductions);
  }, [productions])

  return (
    <View style={styles.container}>
      <FlatList 
        data={production}
        keyExtractor={(production) => production._id}
        renderItem={({item}) => <Production production={item} />}
      />
    </View>
  )
}

export default Productions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
})