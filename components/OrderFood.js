

import { StyleSheet, Text, View, TextInput, 
  Button, FlatList, Image, Alert, Dimensions, Switch} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';



export default class OrderFood extends React.Component{

  constructor(props){
      super(props);
      this.itemRef = firebaseApp.database();
       this.state = {
         data : [],
         amount: 0,
         createAt: '',
         nameTable: '',   
       
       }  
    }

  componentDidMount(){
    const name = this.props.navigation.getParam('nameTable', 'some default value');
    const time = this.props.navigation.getParam('time', 'some default value');
    this.setState({
      nameTable: name,
      createAt: time
      //createAt: createAt
    })
    //read flat list food  
    this.itemRef.ref('Foods').on('value', (snapshot) =>{
        var li = []
        snapshot.forEach((child)=>{
          li.push({
              key: child.key,
              name:child.val().name,
              description: child.val().description,
              price: child.val().price,
              imageUrl: child.val().imageUrl,
        })
      })
     this.setState({data:li})
    });

    //take time
    // var that = this;
    // var date = new Date().getDate(); //Current Date
    // var month = new Date().getMonth() + 1; //Current Month
    // var year = new Date().getFullYear(); //Current Year
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    // that.setState({
    //   //Setting the value of the date time
    //   createAt:
    //     date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    // });  

   }


   orderFood(key, index){

    this.setState({amount: this.state.amount + 1});

      this.itemRef.ref('Orders').child(this.state.createAt).child(this.state.nameTable).child('orderList').push({
        keyFood: key,
        nameFood: this.state.data[index].name,
        priceFood: this.state.data[index].price,
        amountFood: 1
        
      });  
     

   }


 
    render(){
      return (

        <View style={styles.containerView}>

          <Text>{this.state.nameTable}</Text>
         
            <View style= {{
                backgroundColor: '#3897f1',
                flexDirection: 'row',
                height: 60,
                alignItems: 'center',
                }}
            >

            <Text style={{marginLeft: 20, fontWeight: 'bold', color: '#ffffff'}}>Tạo hóa đơn</Text>

            </View>
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20, marginLeft: 20}}>Menu</Text>
            <FlatList style = {{flex :1}} 
                data = {this.state.data} 
                renderItem={ ({item, index}) => {
                    return(
                    
                      <TouchableOpacity onPress = {()=> this.orderFood(item.key, index)}>
                        <View style ={{flex: 1, 
                          backgroundColor: 'white', 
                          borderWidth: 1,
                          flexDirection: 'row',
                          borderRadius: 10,
                          marginTop: 15,
                          marginLeft: 15, 
                          marginRight: 15
                        }}>

                                
                              <Image style={{width: 100, height: 100, borderRadius: 50, marginLeft: 10, marginTop: 10, marginBottom: 10}} 
                                source = {{uri: item.imageUrl}}></Image>
                                
                              <View style = {{marginLeft: 10,marginTop: 20, 
                                height: 80, flexDirection: 'column', flex: 1}}>
                                  <Text style = {{fontSize: 15, color: '#3897f1',fontWeight: 'bold'}}>{item.name}</Text>
                                  <Text style = {{color: '#000000'}}>{item.price} $</Text>
                              </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }
                keyExtractor={(item)=>item.key}
                ref = {"flatList"}
                onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
            />

            <View style = {{
              height: 50,
              backgroundColor: 'red',
              flexDirection: 'row'
            }}>
              <Image style={{width: 35, height: 35,
              marginTop: 10,
              marginLeft: 20}}
                    source = {require('../icons/icons8-favorite-cart-100.png')}
                ></Image>

              <Text style= {{color: '#ffffff',
              fontWeight: 'bold', 
              height: 30,
              width: 30,
              marginTop: 20, 
              marginLeft: 10}}>{this.state.amount}</Text>


              <TouchableOpacity style = {{
                borderWidth: 1, 
                borderColor: '#ffffff', 
                borderRadius: 10, 
                marginLeft: 150,
                marginTop: 10}}

                onPress = {()=> {
                  this.props.navigation.navigate('Bill', {
                    time: this.state.createAt,
                    nameTable: this.state.nameTable
                  })
                }}     
                >
                <Text style= {{color: '#ffffff', margin: 5}}>Thêm vào giỏ hàng</Text>
              </TouchableOpacity>

            </View>


        </View>     
       
      );
    }


  }

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
   
  },
 
});


