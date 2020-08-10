import { StyleSheet, Text, View, TextInput, 
    Image, Platform, ActivityIndicator, Button, Dimensions, Switch} from 'react-native';
import React, {Component} from 'react';
import { firebaseApp } from './FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';


var screen = Dimensions.get('window');
export default class AddInfoOrder extends React.Component{

   constructor(props){
       super(props);
       this.itemRef = firebaseApp.database();
       this.state = {
            tableName: '',
            tableStatus: false,
            tableAmount: '', 
           

       }
     }

     showAddModal(){
       this.refs.myModal.open();
     }

     addInfoOrderTable(){
       this.itemRef.ref('Tables').push({
            name: this.state.tableName,
            status: this.state.tableStatus,
            amount: this.state.tableAmount,
            phone: '',
       });
   
       this.setState({
            tableName: '',
            tableStatus: '',
            tableAmount: '',
       })
      this.refs.myModal.close();

     }

     render(){
       return (

         <Modal  ref = {"myModal"}
           style = {{
             justifyContent: 'center',
             borderRadius: 10, 
             shadowRadius: 10,
             width: screen.width - 80,
             height: 280
           }}           
           position = 'center'
           backdrop = {true}
           onClosed ={() => {
           }}
           >
           <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 20}}>Thêm bàn</Text>
           <TextInput 
               style = {styles.input}
               placeholder="Tên bàn"
               onChangeText={(tableName) => this.setState({tableName})}
               value = {this.state.tableName}>
            </TextInput>
 
           <TextInput 
               style = {styles.input}
               placeholder="Số lượng"
               keyboardType = 'numeric'
               onChangeText={(tableAmount) => this.setState({tableAmount})}
               value = {this.state.tableAmount}>
           </TextInput>

           <Button title='Thêm' onPress= {() => this.addInfoOrderTable()} />
               
         </Modal>     
       );
     }


}

const styles = StyleSheet.create({
   containerView: {
     width: 350,
     marginTop: 20,
     marginLeft: 30,
     height: 300
   },
   input: {
       borderWidth: 1,
       borderColor: '#eaeaea',
       margin: 10
   }
 });
 
 
 