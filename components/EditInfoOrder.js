import { StyleSheet, Text, View, TextInput, 
    Image, Platform, ActivityIndicator, Button, Dimensions, Switch} from 'react-native';
import React, {Component} from 'react';
import { firebaseApp } from './FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';


var screen = Dimensions.get('window');
export default class EditInfoOrder extends React.Component{

   constructor(props){
       super(props);
       this.itemRef = firebaseApp.database();
       this.state = {
            tableName: '',
            tableStatus: false,
            tableAmount: '',
            amountPeople: '',

       }
     }

     showEditModal = (editingTable, flatListItem) => {
        this.setState({
            key: editingTable.key,
            name: editingTable.tableName,
            status: editingTable.tableStatus,
            amount: editingTable.tableAmount,
            flatListItem: flatListItem
        });

        this.refs.myModal.open();

    }

   

     render(){
        firebaseApp.database().ref(`Tables/${this.state.key}`).once('value', (snapshot) => {
            this.state.tableName = snapshot.child('name').val();
            this.state.amountPeople = snapshot.child('amount').val();
            this.state.tableStatus = snapshot.child('status').val();
            console.log(snapshot.child('name').val());
        });
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
           <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 20}}>Thông tin đặt bàn</Text>
           <Text style={{marginLeft: 20}}>Tên bàn: {this.state.tableName}</Text>
           {/* <TextInput 
               style = {styles.input}
               placeholder="Table's name"
               onChangeText={(tableName) => this.setState({tableName})}
               value = {this.state.tableName}>
            </TextInput> */}

            <Text style={{marginLeft: 20}}>Tình trạng bàn: </Text>
            {/* <Switch 
                onValueChange={tableStatus => this.setState({tableStatus})}
                value={this.state.tableStatus} 
            /> */}
            <Text style={{marginLeft: 20}}>Số lượng khách hiện tại: {this.state.amountPeople}</Text>
           <TextInput 
               style = {styles.input}
               placeholder='Số lượng khách'
               keyboardType = 'numeric'
               onChangeText={(tableAmount) => this.setState({tableAmount})}
               value = {this.state.tableAmount}
             >
           </TextInput>

          <Button title = 'Lưu' 
                onPress ={() => {
                  
                    this.itemRef.ref('Tables').child(this.state.key).update({
                        name: this.state.tableName,
                        status: this.state.tableStatus,
                        amount: this.state.tableAmount,
                        phone: '',
                    });

                    this.refs.myModal.close();
                }}/>

               
         </Modal>     
       );
     }


}

const styles = StyleSheet.create({
   containerView: {
     width: 350,
     marginTop: 20,
     marginLeft: 30,
   },
   input: {
       borderWidth: 1,
       borderColor: '#eaeaea',
       margin: 10
   }
 });
 
 
 