import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";


const Carousel = () => {
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dysq7pufd/image/upload/";

  const slides = [
    `${cloudinaryBaseUrl}v1701363023/laundry/istockphoto-1247884083-612x612_j1ato4.jpg`,
    `${cloudinaryBaseUrl}v1701363058/laundry/pexels-photo-5591581_c3mzrd.webp`,
    `${cloudinaryBaseUrl}v1701363058/laundry/pexels-photo-5591581_c3mzrd.webp`,
    `${cloudinaryBaseUrl}v1701363058/laundry/pexels-photo-5591581_c3mzrd.webp`,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <>
    <View>
      <SliderBox
        images={slides}
        autoPlay
        circleLoop
        dotColor={"#13274F"}
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{
          borderRadius: 6,
          width: "94%",
        }}
      />
      <View style={styles.imageOverlay}>
        {slides.map((slide, index) => (
          <Pressable
            key={index}
            onPress={() => handleImagePress(index)}
            style={[
              styles.imageTouchArea,
              {
                opacity: currentImageIndex === index ? 0.6 : 0,
              },
            ]}
          >
            {/* You can add an overlay or animation effect here */}
          </Pressable>
        ))}
      </View>

    </View>
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200, // Set your desired dimensions
    height: 200,
  },
});