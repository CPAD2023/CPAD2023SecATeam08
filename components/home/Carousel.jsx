import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box'
import { COLORS } from '../../constants'

const Carousel = () => {
    const slides=[
        "https://d9dvmj2a7k2dc.cloudfront.net/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/6/9/69103-38-35-t896.jpg",
        "https://wallpaperaccess.com/full/2076086.jpg",
        "https://i5.walmartimages.com/asr/dcadef0d-0709-4d44-a4fb-c99b8145b709_3.5d656729637955a4f31f31b6bdf1bb91.jpeg"
    ]
  return (
    <View style={styles.carouselContainer}>
        <SliderBox images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{borderRadius:15, width:"95%",marginTop:15}}
        autoplay
        circleLoop
        
        />
      
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer:{
        flex:1,
        alignItems:"center"
    }
})