import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import React from 'react'
import styles from './productList.style'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES } from '../../constants'
import ProductCardView from './ProductCardView'

const ProductList = () => {
  const {data, isLoading, error}=useFetch();
console.log(data)
  if(isLoading){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item})=>(<ProductCardView item={item}/>)}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={()=><View style={styles.separator}/>}
      />
    </View>
  )
}

export default ProductList

