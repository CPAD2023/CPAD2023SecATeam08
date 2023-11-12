import {  Image, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useRoute} from "@react-navigation/native"
import styles from './productDetails.style'
import { Fontisto, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants'
import addToCartNew from '../hook/addToCartNew'
import AsyncStorage from '@react-native-async-storage/async-storage'
//import addToCart from '../hook/addToCart'


const ProductDetails = ({navigation}) => {
  const route=useRoute();
  const {item} =route.params;
  const [count, setCount]=useState(1)
  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const [favourites, setFavourites]=useState(false)


  const increament=()=>{
    setCount(count+1)
  }
  const decreament=()=>{
    if(count>1){
    setCount(count-1)
    }
  }
  useEffect(()=>{
    checkUser();
    checkFavourites();
  },[])

  const checkUser=async()=>{
    try{
      const id=AsyncStorage.getItem('id');
      if(id!==null){
        setIsLoggedIn(true)
      }else{
        console.log('user not logged in')
      }
    }catch(error){

    }
  }

 

  const addToFavourites=async()=>{
    const id=await AsyncStorage.getItem('id')
    const favouritesId=`favourites${JSON.parse(id)}`

   // console.log(favouritesId)
   let productId=item._id;
   let productObj={
    title:item.title,
    id:item._id,
    supplier:item.supplier,
    price:item.price,
    imageUrl:item.imageUrl,
    product_location:item.product_location
   }
   try{
    const existingItem=await AsyncStorage.getItem(favouritesId);
    let favouritesObj=existingItem?JSON.parse(existingItem):{};

    if(favouritesObj[productId]){
      delete favouritesObj[productObj];

      console.log("deleted")
      setFavourites(false)
    }else{
      favouritesObj[productId]=productObj;
      console.log("added to fav")
      setFavourites(true)
    }
    await AsyncStorage.setItem(favouritesId,JSON.stringify(favouritesObj));
   }catch(error){
    console.log(error)
   }

  }

  const handlePress=()=>{
    if(isLoggedIn === false){
      navigation.navigate('Login')
    }else{
      addToFavourites()
    }
  }

  const handleBuy=()=>{
    if(isLoggedIn === false){
      navigation.navigate('Login')
    }else{
      console.log('pressed')
    }
  }
  const handleCart=()=>{
    if(isLoggedIn === false){
      navigation.navigate('Login')
    }else{
      addToCartNew(item._id,count)
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
        if(favourites[item._id]){
          //console.log(item._id)
          setFavourites(true)
        }
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={isLoggedIn===true?()=>{}:navigation.navigate('Login')}>
          <Ionicons name="chevron-back-circle" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handlePress()}>
          <Ionicons name={favourites?'heart':'heart-outline'}size={30} color={COLORS.primary}/>
        </TouchableOpacity>
      </View>
      <Image 
      source={{uri:item.imageUrl}}
      style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
          <Text style={styles.price}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1,2,3,4,5].map((index)=>(
              <Ionicons
              key={index}
              name='star'
              size={24}
              color="gold"
              />
            ))}
          <Text style={styles.ratingText}>(4.9)</Text>
          </View>
              <View style={styles.rating}>
                <TouchableOpacity onPress={()=>increament()}>
                  <SimpleLineIcons
                  name="plus" size={20}/>
                </TouchableOpacity>
                <Text style={styles.ratingText}>  {count}  </Text>
                <TouchableOpacity onPress={()=>decreament()}>
                <SimpleLineIcons
                  name="minus" size={20}/>
                </TouchableOpacity>
              </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.descText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor enim nec tellus placerat venenatis. Vivamus vulputate vel nulla eu aliquam. Sed ac quam congue elit feugiat euismod ut id ex. Pellentesque accumsan tellus urna, id aliquet mauris congue eget. Aliquam porttitor suscipit gravida. Duis leo justo, auctor quis augue eget, consectetur tristique turpis. Donec porta tristique lorem ut aliquam. Fusce viverra eu nibh eget tincidunt. Aenean tincidunt eros enim, ut bibendum purus consequat eget. Nulla sit amet pulvinar enim.
          </Text>
        </View>
        <View style={{marginBottom:SIZES.small}}>
          <View style={styles.location}>
            <View style={{flexDirection:"row"}}>
              <Ionicons name="location-outline" size={20}/>
              <Text>  {item.product_location}</Text>
            </View>

            <View style={{flexDirection:"row"}}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20}/>
              <Text>  Free Delivery  </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={()=>handleBuy()} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>handleCart()} style={styles.addCart}>
              <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default ProductDetails

