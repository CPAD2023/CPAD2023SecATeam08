import { StyleSheet, Text, View ,ScrollView,Pressable,Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Services = () => {
  const navigation = useNavigation();
  

 const services = [
    {
      id: "0",
      image: "https://res.cloudinary.com/dysq7pufd/image/upload/v1701363685/services/3003984_pvi23f.png",
      name: "Washing",
     
    },
    {
      id: "11",
      image: "https://res.cloudinary.com/dysq7pufd/image/upload/v1701363702/services/2975175_m98ngt.png",
      name: "Laundry"
    },
    {
      id: "12",
      image: "https://res.cloudinary.com/dysq7pufd/image/upload/v1701363712/services/9753675_n1cvjs.png",
      name: "Wash & Iron",
     
    },
    {
      id: "13",
      image: "https://res.cloudinary.com/dysq7pufd/image/upload/v1701363717/services/995016_ykza2y.png",
      name: "Cleaning",
    },
   
  ];
  const navigateToServiceDetail = (serviceName) => {
    navigation.navigate('ServiceDetail', {
      serviceName,
    });
  };
  return (
    <View style={{padding:10}}>
        <Text style={{fontSize:16,fontWeight:"500",marginBottom:7}}>Services Available</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {services.map((service,index) => (
                <Pressable style={{margin:10,backgroundColor:"white",padding:20,borderRadius:7}} key={index} 
                onPress={() => navigateToServiceDetail(service.name)}>
                    <Image source={{uri:service.image}} style={{width:70,height:70}}/>

                    <Text style={{textAlign:"center",marginTop:10}}>{service.name}</Text>
                </Pressable>
            ))}
        </ScrollView>
    </View>
  )
}

export default Services

const styles = StyleSheet.create({})