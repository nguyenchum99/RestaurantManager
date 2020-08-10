import { StyleSheet, Text, View, TextInput, 
    Button, FlatList, Image, Alert, Dimensions} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

export default class EditFood extends React.Component{
    
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            newFoodName:'',
            newFoodDesciption: '',
            newFoodPrice: '',
            newFoodImage: '',
            priceText: '',
            descriptionText: '',
            time: '',
           
        };
    }

    showEditModal = (editingFood, flatListItem) => {
        this.setState({
            key: editingFood.key,
            name: editingFood.newFoodName,
            price: editingFood.newFoodPrice,
            description: editingFood.newFoodDesciption,
            timeUpdate: editingFood.time,
            flatListItem: flatListItem
        });

        this.refs.myModal.open();

    }

    componentDidMount() {
       
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        this.setState({
          //Setting the value of the date time
          time:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
      }

    render(){
        

        firebaseApp.database().ref(`Foods/${this.state.key}`).once('value', (snapshot) => {
            // snapshot.forEach(function (childSnapshot) {

            //     var value = childSnapshot.val();
            //     console.log(value);
            // });
            this.state.newFoodName = snapshot.child('name').val();
            this.state.priceText = snapshot.child('price').val();
            this.state.descriptionText = snapshot.child('description').val();
            console.log(snapshot.child('name').val());
            
        });

        return (
            <Modal
                ref = {"myModal"}
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
                <Text style={{fontWeight: 'bold', fontSize: 15}}>Sửa thông tin món ăn</Text>
                <Text> Tên món: {this.state.newFoodName}</Text>
                <Text>Giá:</Text>
                <TextInput 
                style = {{borderWidth: 1, borderColor: 'blue', margin: 5}}
                onChangeText = {(text) => this.setState({newFoodPrice: text})}
                value = {this.state.newFoodPrice}
                placeholder = {this.state.priceText}
                ></TextInput>
                <Text>Mô tả:</Text>
                <TextInput 
                style = {{borderWidth: 1, borderColor: 'blue', margin: 5}}
                onChangeText = {(text) => this.setState({newFoodDesciption: text})}
                value = {this.state.newFoodDesciption}
                placeholder = {this.state.descriptionText}
                ></TextInput>

                <Button title = 'Save' 
                    onPress ={() => {
                        if(this.state.newFoodName.length == 0 || 
                            this.state.newFoodPrice.length == 0 || 
                            this.state.newFoodDesciption.length == 0)
                            {
                                alert("Bạn phải điền đầy đủ thông tin");
                                return;
                            }
                        this.itemRef.ref('Foods').child(this.state.key).update({
                            name: this.state.newFoodName,
                            description: this.state.newFoodDesciption,
                            price: this.state.newFoodPrice,
                            timeUpdate: this.state.time
                        });

                        this.refs.myModal.close();
                }}/>

            </Modal>
        )
    }
}