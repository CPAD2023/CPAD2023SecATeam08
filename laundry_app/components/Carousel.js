import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";


const Carousel = () => {
  const slides = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
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