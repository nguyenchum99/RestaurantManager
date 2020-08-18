

import { StyleSheet, Text, View, TextInput, 
    Button, FlatList, Image, Alert} from 'react-native';
import React, {Component, useState } from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import Swipeout from 'react-native-swipeout';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AddInfoOrder from './AddInfoOrder';
import EditInfoOrder from './EditInfoOrder';


//render item flatlist



export default class FlatListTables extends React.Component{

    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
         this.state = {
           data : [],
           deletedRowKey: null,
           time: ''
           
         }

       
      }

    componentDidMount(){
        this.itemRef.ref('Tables').on('value', (snapshot) =>{
          var li = []
          snapshot.forEach((child)=>{
            li.push({
                key: child.key,
                name:child.val().name,
                status: child.val().status,
                amount: child.val().amount,
                phone: child.val().phone,
                chair: child.val().chair,        

          })
        })
       this.setState({data:li})
      })

        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
        //Setting the value of the date time
        time:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
     }


     refreshFlatList = (deletedKey) =>{
         this.setState((prevState) => {
             return {
                 deletedRowKey: deletedKey
             };
         });
        
     }

     checkStatus =(amount)=>{
        if(amount != 0)
            return <Text style = {{color: 'red'}}>Đã có</Text>;
        else {
            return <Text  style = {{color: 'blue'}}>Trống</Text>;

        }           
    }


     onPressAdd= () => {
        //  alert("you add item");
        this.refs.addModal.showAddModal();
     }

     showAlert = (name, key) => {
        this.setState({deletedRowKey: key});
        Alert.alert(
           "Thông tin bàn",
           "",
            [
              {
                text: "Xem hóa đơn",
                onPress: () => this.props.navigation.navigate('bill')
                
              },
              { text: "Chọn món", onPress: () => this.props.navigation.navigate('Menu', {
                    nameTable: name,
                
                })
              },{
                text: "Thông tin",
                onPress: () =>{
                    this.refs.editModal
                        .showEditModal(firebaseApp.database().ref('Tables')
                        .child(this.state.deletedRowKey), this);
                }

              }

            ],
            { cancelable: false }
          );
     }

      render(){
       
        return (
          <View style={styles.containerView}>
              
            {/* <AddNewFood/>   */}
            <View style= {{
                backgroundColor: '#3897f1',
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                }}
            >
                <Text style={{marginLeft: 20, fontWeight: 'bold', color: '#ffffff'}}>Thêm thông tin bàn</Text>
                <TouchableHighlight
                style={{marginLeft: 200}}
                underlayColor = '#3897f1'
                onPress={() => this.onPressAdd()}
                >
                    <Image style={{width: 35, height: 35}}
                    source = {require('../icons/icons8-add-64.png')}
                    ></Image>

                </TouchableHighlight>

            </View>

            <FlatList  
                data = {this.state.data} 
                renderItem={ ({item, index}) => {
                    return(
                    <TouchableOpacity 
                        onPress = {() => this.showAlert(item.name, item.key)}
                        >
                        <View style ={styles.itemContent}>
                  
                            <View style = {styles.textContent}>
                                <Text style = {styles.textName}>{item.name}</Text>
                                <Text  style = {styles.text}>Số lượng khách hiện tại: {item.amount}</Text>
                                <Text  style = {styles.text}>Tình trạng đặt bàn: {this.checkStatus(item.amount)}</Text>
                                <Text  style = {styles.text}>Số ghế: {item.chair}</Text>
                                <Text  style = {styles.text}>SĐT đặt bàn: {item.phone}</Text>         
                            </View> 
        
                            <View>
                                <Image style={{width: 35, height: 35, marginLeft: 150, marginTop: 10}}
                                source = {require('../icons/icons8-edit-64.png')}
                                ></Image>
                            </View>
                    
                        </View>
                    </TouchableOpacity>
                        
                    );
                    }
                }
                keyExtractor={(item)=>item.key}
                ref = {"flatList"}
               // onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
            />
            <AddInfoOrder ref ={'addModal'} parentFlatList = {this}></AddInfoOrder>
            <EditInfoOrder ref={'editModal'} parentFlatList={this}></EditInfoOrder>

          </View>     
        );
      }
  
  
  }
  
  const styles = StyleSheet.create(
    {
        itemContent: {
            flex: 1,
            flexDirection: 'row',
            borderRadius: 10,
            marginTop: 15,
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: '#4db8ff'
        },
        textContent: {
            flexDirection: 'column', 
            marginLeft: 10, 
            marginTop: 10,
            marginBottom: 10,
    
        },
        containerView: {
            flex: 1,
            backgroundColor: '#ffffff'
        },
        textName: {
            fontSize: 15, 
            color: '#ffffff',
            fontWeight: 'bold'
        },
        text: {
            color: '#ffffff'
        }
    });
