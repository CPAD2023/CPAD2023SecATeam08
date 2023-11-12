import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

const addToCartNew= async(productId,quantity)=>{
    try{
        const token =await AsyncStorage.getItem('token');
        //const id =await AsyncStorage.getItem('id');
        const endpoint="http://localhost:3000/api/carts";
        console.log(token)
        const data={
            cartItem:productId,
            quantity:quantity
        }
        const headers={
            'Content-Type': 'application/json',
            'token': 'Bearer '+ JSON.parse(token)
        };
        await axios.post(endpoint,data,{headers})
    }catch(error){
        throw new Error(error.message)
    }
}
export default addToCartNew