import { StyleSheet } from "react-native";
import { SIZES } from "../constants";

const styles=StyleSheet.create({
    container:{
        marginTop:20,
        marginHorizontal:20
    },
    titleRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width:SIZES.width-50,
        marginBottom:12
    },
    titletxt:{
        fontFamily:"bold",
        fontSize:SIZES.xLarge,
        letterSpacing:4,
        marginLeft:SIZES.small
    }
})

export default styles;