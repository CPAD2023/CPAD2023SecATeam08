import { StyleSheet, Text, View, SafeAreaView, Pressable} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView >
      <LottieView 
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width:300,
        //   flex: 1, 
          justifyContent: "center", 
          alignItems: "center" ,
          paddingLeft:430,
          alignSelf: "center",
           marginTop: 40,
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 60,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
           position: "absolute",
          top: 100,
          width: 300,
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Pressable
        onPress={() => {
          // Navigate back to the Home screen
          navigation.navigate("Home"); // Replace "Home" with the name of your HomeScreen route
        }}
        style={{
          marginTop: 20,
          backgroundColor: "#088F8F",
          padding: 10,
          borderRadius: 8,
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Back to Home</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});