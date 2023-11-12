import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import styles from './favourites.style';
import { COLORS } from '../constants';

const Favourites = ({navigation}) => {

  const [favData, setFavData]=useState([]);

  useEffect(()=>{
    checkFavourites();
  })

  const deleteFavourites=async(product)=>{
    const id=await AsyncStorage.getItem('id')
    const favouritesId=`favourites${JSON.parse(id)}`

   // console.log(favouritesId)
   let productId=product;
   try{
    const existingItem=await AsyncStorage.getItem(favouritesId);
    let favouritesObj=existingItem?JSON.parse(existingItem):{};

    if(favouritesObj[productId]){
      delete favouritesObj[productObj];

navigation.goback();    
}
    await AsyncStorage.setItem(favouritesId,JSON.stringify(favouritesObj));
   }catch(error){
    console.log(error)
   }

  }

  const checkFavourites=async()=>{
    const id=await AsyncStorage.getItem('id');
    const favouritesId=`favourites${JSON.parse(id)}`;
    //console.log(favouritesId)
    try{
      const favouritesObj=await AsyncStorage.getItem(favouritesId)
      if(favouritesObj!==null){
        const favourites=JSON.parse(favouritesObj)
        const favList=Object.values(favourites)
        setFavData(favList)
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={()=>navigation.goback()}>
          <Ionicons
          name='chevron-back-circle'
          size={30}
          color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.titletxt}>Favourites</Text>
      </View>
      <FlatList
      data={favData}
      renderItem={({item})=>(<Text>{item.title}</Text>)}
      />
    </SafeAreaView>
  )
}

export default Favourites

