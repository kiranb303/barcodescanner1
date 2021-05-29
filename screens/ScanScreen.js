import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'

export default class ScanScreen extends React.Component {
  constructor(){
    super();
    this.state = {cameraPermission: null,
                  scanned: false,
                  scannedData:'',
                  buttonState: 'normal',
                };
  }

  useBarCodeScanner = async ({type, data}) =>{
    this.setState({scanned: true, scannedData: data, buttonState: 'normal'})
  }

   getPermission = async (id) =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({cameraPermission: status==="granted", buttonState: id, scanned: false});
  }

  render(){
  const cameraPermission = this.state.cameraPermission;
  const scanned = this.state.scanned;
  const buttonState = this.state.buttonState;

  if(buttonState!=="normal" && cameraPermission){
    return(
      <BarCodeScanner 
      onBarCodeScanned = {scanned? undefined:this.useBarCodeScanner}
      style = {StyleSheet.absoluteFillObject} />
    )
  }
  else if(buttonState==="normal"){
  return (
    <View style={styles.container}>
      <View>
      <Text style = {{textAlign:"center", alignSelf:"center", fontSize:50, fontWeight:"bold",}}>BarCode Scanner App</Text>
        <Image source = {require("../assets/scanner.jpg")} style = {{width:200, height:200, alignSelf:"center"}}/>
      </View>
      
      <View style = {styles.inputView}>
        <TouchableOpacity 
                        style = {styles.button} 
                        onPress = {()=>{this.getPermission("StudentId")}}>
            <Text style = {styles.buttonText}>Scan</Text>
        </TouchableOpacity>
      </View>

    <Text style = {styles.buttonText}>
      {cameraPermission===true? this.state.scannedData : "request Camera Permission"}
    </Text>
    
    </View>
  );
}
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    padding: 8,
    alignItems: "center"
  },
  buttonText: {
    fontSize:25,
    alignSelf:"center",
    fontWeight:"bold",
    color:"black",
  },
  button: {
    borderRadius: 50,
    width:100,
    alignSelf:"center",
    alignItems:"center",
    backgroundColor:"orange",
  },
  inputView: {
    flexDirection: "row",
    margin:20,
  },
  inputBox: {
    width:200,
    height: 40,
    borderWidth:4,
    fontSize: 30,
  },
});
