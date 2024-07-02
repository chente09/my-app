import { Alert, Button, FlatList, ImageBackground, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
//FIREBASE
import { db } from '../config/Config'
import { onValue, ref, set } from "firebase/database";

export default function UsuarioScreen() {
  const [cedula, setcedula] = useState("")
  const [nombre, setnombre] = useState("")
  const [correo, setcorreo] = useState("")
  const [comentario, setcomentario] = useState("")

  const [lista, setlista] = useState([])

  ////////////// GUARDAR ///////////

function guardarUsuario(cedula: string, nombre:string, correo:string, comentario:string) {
  
  try {
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      email: correo,
      coment : comentario
    });
    Alert.alert('Mensaje', 'Usuario Almacenado')

  } catch (error) {
    console.log(error);
  }

  setcedula('')
  setnombre('')
  setcorreo('')
  setcomentario('')
}

///////////////////////// LEER //////////////////

function leer(){
  const starCountRef = ref(db, 'usuarios/');  //linea ruta para leer datos
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);

  //CAMBIO DE FORMATO DE LOS DATOS
  const listaTemp:any =Object.keys(data).map((cedula)=>({
    key: cedula, ...data[cedula]
  }))

  console.log(listaTemp);
  setlista(listaTemp)
  
});
}

useEffect(() => {
  leer()
}, [])

type Usuario ={
  name: string
}

  return (
    <ImageBackground 
    source={{uri:"https://i.pinimg.com/564x/13/10/09/13100990862e04fcf2dae09e51a75edb.jpg"}}
    style={styles.container}>
      <Text>UsuarioScreen</Text>
      <TextInput
        placeholder='Ingrese Cédula'
        placeholderTextColor={'white'}
        style={styles.txt}
        keyboardType='numeric'
        onChangeText={(texto)=>setcedula(texto)}
        value={cedula}
      />
      <TextInput
        placeholder='Ingrese Nombre'
        placeholderTextColor={'white'}
        style={styles.txt}
        onChangeText={(texto)=>setnombre(texto)}
        value={nombre}
      />
      <TextInput
        placeholder='Ingrese Correo'
        placeholderTextColor={'white'}
        style={styles.txt}
        keyboardType='email-address'
        onChangeText={(texto)=>setcorreo(texto)}
        value={correo}
      />
      <TextInput
        placeholder='Ingrese Comentario'
        placeholderTextColor={'white'}
        style={styles.txt }
        onChangeText={(texto)=>setcomentario(texto)}
        multiline
        value={comentario}
      />
      <Button title='GUARDAR' onPress={()=> guardarUsuario(cedula,nombre,correo,comentario)}/>
      <FlatList
        data={lista}
        renderItem={({item}:{item:Usuario})=>
          <View>
            <Text style={styles.texto}>{item.name}</Text>
          </View>
        }
      />
      <StatusBar
      backgroundColor='white'
      barStyle='dark-content'
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#397789f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
    backgroundColor:'#727f83f7',
    height:40,
    width:'80%',
    margin:5,
    fontSize:25,
    borderRadius:40,
    paddingHorizontal:10,
    color: 'white'
  },
  texto:{
    width:'90%',
    margin:5,
    fontSize:25,
    borderRadius:40,
    paddingHorizontal:10,
    color: 'white'
  }
})