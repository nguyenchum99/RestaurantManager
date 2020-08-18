

import { StyleSheet, Text, View, TextInput, 
    Button, FlatList, Image, Alert} from 'react-native';
import React, {Component, useState } from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import Swipeout from 'react-native-swipeout';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AddInfoOrder from './AddInfoOrder';
import EditInfoOrder from './EditInfoOrder';


//render item flatlist
class FlatListItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeRowKey: null,
           // backgroundColor: '#ffffff'
             
        }
      
    }


    //check status table is busy or empty
    checkStatus(){
        if(this.props.item.amount != 0)
            return <Text style = {{color: 'red'}}>Đã có</Text>;
        else {
            return <Text  style = {{color: 'blue'}}>Trống</Text>;

        }           
    }

    orderFood= ()=> {
        console.log(error)
        this.props.navigation.navigate('food');
    }

    editInfoOrder = ()=> {
        this.props.parentFlatList.refs.editModal
        .showEditModal(firebaseApp.database().ref('Tables')
        .child(this.state.activeRowKey), this);
    }
  
    render(){
        // const swipeoutSetting = {
        //     autoClose: true,
        //     onClose: (secId, rowId, direction) => {
        //         if(this.state.activeRowKey != null)
        //             this.setState({activeRowKey: null});
        //     },
        //     onOpen: (secId, rowId, direction) => {
        //         this.setState({activeRowKey: this.props.item.key});
        //     },
        //     right: [
        //         {
        //             onPress: ()=>{

        //             },
        //             text: 'Delete', type: 'delete'
        //         },
        //         {
        //             onPress: () =>{
        //                 this.props.parentFlatList.refs.editModal
        //                 .showEditModal(firebaseApp.database().ref('Tables')
        //                 .child(this.state.activeRowKey), this);

        //             },
        //             text: 'Edit', type: 'primary'
        //         }
        //     ],
        //     rowId: this.props.index,
        //     sectionId: 1,

        // }
        return (
            <View style ={{
                flex: 1,
                flexDirection: 'row',
                borderRadius: 10,
                marginTop: 15,
                marginLeft: 15,
                marginRight: 15,
                shadowOpacity: 0.8,
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowColor: 'blue',
                shadowRadius: 2,
                backgroundColor: '#e6f9ff'
                }}>
                  
                    <View style = {{flexDirection: 'column', marginLeft: 10, marginTop: 10,marginBottom: 10}}>
                        <Text style = {{fontSize: 15, color: '#3897f1',fontWeight: 'bold'}}>{this.props.item.name}</Text>
                        <Text  style = {{color: '#000000'}}>Số lượng khách hiện tại: {this.props.item.amount}</Text>
                        <Text  style = {{color: '#000000'}}>Tình trạng đặt bàn: {this.checkStatus()}</Text>
                        <Text  style = {{color: '#000000'}}>Số ghế: {this.props.item.chair}</Text>
                        <Text  style = {{color: '#000000'}}>SĐT đặt bàn: {this.props.item.phone}</Text>         
                    </View> 

                    <View onPress = {() => this.editInfoOrder()}>
                        <Image style={{width: 35, height: 35, marginLeft: 150, marginTop: 10}}
                        source = {require('../icons/icons8-edit-property-64.png')}
                        ></Image>
                    </View>
                
            </View>
           
           
        );
    }
}


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


     onPressAdd= () => {
        //  alert("you add item");
        this.refs.addModal.showAddModal();
     }

     showAlert = (name) => {
        Alert.alert(
           "",
           "",
            [
              {
                text: "Xem hóa đơn",
                onPress: () => this.props.navigation.navigate('bill')
                
              },
              { text: "Chọn món", onPress: () => this.props.navigation.navigate('Menu', {
                    nameTable: name,
                
                    })
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
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20, marginLeft: 20}}>Danh sách bàn</Text>

            <FlatList  
                data = {this.state.data} 
                renderItem={ ({item, index}) => {
                    return(
                        <TouchableOpacity 
                        // onPress = {() => this.props.navigation.navigate('Menu', {
                        //     nameTable: item.name,
                        //     time: new Date()
                        // })}

                        onPress = {() => this.showAlert(item.name)}
                      
                        >
                            <FlatListItem 
                                item = {item} 
                                index= {index} parentFlatList={this}
                            
                            >  
                            </FlatListItem>
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
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      backgroundColor: '#ffffff'
     
    },
   
  });
  
  
