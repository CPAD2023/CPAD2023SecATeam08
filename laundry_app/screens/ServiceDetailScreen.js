import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';


const ServiceDetailScreen = ({ route }) => {
    const navigation = useNavigation();
  const { serviceName } = route.params;

  // Define service details for each service
  const serviceDetails = {
    Washing: {
    image: "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",

      description: 'This service includes washing clothes. We use state-of-the-art machines to ensure your clothes are cleaned with care. Our experienced staff meticulously handles your garments, ensuring they look as good as new. We also offer eco-friendly detergents and a variety of washing options, from delicate to heavy-duty loads.',
      price: '$10',
    },
    Laundry: {
    image: "https://kua.com/wp-content/uploads/2019/10/shutterstock_1179456106.jpg",

      description: 'Our laundry service is quick and efficient. We offer a 24-hour turnaround time for your convenience. Price: $15 per load. This is some additional content for the description. You can add more and it will become scrollable if it exceeds the screen height.',
      price: '$15',
    },
    'Wash & Iron': {
    image: "https://hellolaundry.co.uk/wp-content/uploads/2022/05/washing-ironing-linen-clothes.jpeg",

      description: 'We wash and iron your clothes with precision. We take special care of delicate fabrics. Price: $20 per load. This is some additional content for the description. You can add more and it will become scrollable if it exceeds the screen height.',
      price: '$20',
    },
    Cleaning: {
    image: "https://static.toiimg.com/thumb/msid-99612207,imgsize-16602,width-400,resizemode-4/99612207.jpg",
      description: 'We provide professional cleaning services. Our team is highly skilled in deep cleaning and maintaining a fresh and hygienic environment. Price: $30 per hour. This is some additional content for the description. You can add more and it will become scrollable if it exceeds the screen height.',
      price: '$30',
    },
  };

  const service = serviceDetails[serviceName];

  return (
    <>
    <ScrollView style={styles.container}>
    
        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop:10
            }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <Text style={{fontSize:16}}>Your Bucket</Text>
          </View>
      <Text style={styles.serviceName}>{serviceName}</Text>
      <Image source={{ uri: service.image }} style={{ width: "100%", height: 200, overflow:"hidden", justifyContent:"center", alignItems:"center",marginTop:10, borderRadius:8 }} />
      <Text style={styles.serviceName}>Description</Text>
      <Text style={styles.description}>{service.description}</Text>
      
    
    </ScrollView>
    <Pressable
    style={{
      backgroundColor: "#088F8F",
      padding: 10,
      marginBottom: 40,
      margin: 15,
      borderRadius: 7,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:"space-between"
    }}
  >
    <View>
      <Text style={{fontSize:17,fontWeight:"600",color:"white"}}> {service.price}</Text>
      <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>
    </View>

   
      <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Per Load</Text>
   
  </Pressable>
  </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60, 
      backgroundColor: 'white',
    },
    serviceName: {
        paddingTop: 60, 
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
        
      fontSize: 18,
      marginBottom: 10,
      textAlign:"justify"
    },
    price: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    bottomContainer: {
       paddingTop:60,
        justifyContent: 'flex-end',
        marginBottom: 20,
      },
  });
  
export default ServiceDetailScreen;
