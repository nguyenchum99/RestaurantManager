

import { StyleSheet, Text, View, TextInput, 
    Button, FlatList, Image, Alert, Dimensions, Switch} from 'react-native';
  import React, {Component} from 'react';
  import {firebaseApp} from '../components/FirebaseConfig';
  import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
  
  
  
  export default class BillDetail extends React.Component{
    
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
         this.state = {
           data : [],
           amount: 0,
           createAt: '',
           nameTable: '',  
           number: 1   
         
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
        //food order
        this.itemRef.ref('Orders').child(time).child(name).child('orderList').on('value', (snapshot) =>{
            var li = []
            snapshot.forEach((child)=>{
              li.push({
                  key: child.key,
                  name:child.val().nameFood,
                  //description: child.val().description,
                  price: child.val().priceFood,
                  amoutItem: child.val().amountFood
            
            })
          })
         this.setState({data:li})
        });
    }
    
   
      render(){
        return (
  
          <View style={styles.containerView}>
   
            <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 20}}>Hóa đơn</Text>
        
            <FlatList style = {{flex :1}} 
                data = {this.state.data} 
                renderItem={ ({item, index}) => {
                    return(
                    
        
                        <View style ={{flex: 1, 
                          backgroundColor: 'white', 
                          borderWidth: 1,
                          flexDirection: 'row',
                          borderRadius: 10,
                          marginTop: 15,
                          marginLeft: 15, 
                          marginRight: 15
                        }}>
                              <View style = {{marginLeft: 10,marginTop: 20, 
                                height: 80, flexDirection: 'column', flex: 1}}>
                                  <Text style = {{fontSize: 15, color: '#3897f1',fontWeight: 'bold'}}>{item.name}</Text>
                                  <Text style = {{color: '#000000'}}>{item.price} $</Text>
                                  <View style = {{flex:1, flexDirection: 'row'}}>
                                    <TouchableOpacity onPress = {() => item.amoutItem - 1}>
                                        <Image style={{width: 30, height: 30}}
                                        source = {require('../icons/icons8-minus-32.png')}
                                        ></Image>
                                    </TouchableOpacity>
                                    <Text style = {{color: '#000000', margin: 10}}>{item.amoutItem}</Text>
                                    <TouchableOpacity onPress = {() => item.amoutItem + 1}>
                                        <Image style={{width: 30, height: 30}}
                                        source = {require('../icons/icons8-add-48.png')}
                                        ></Image>
                                    </TouchableOpacity>
                                  </View>
                              </View>
                        </View>
                
                    );
                  }
                }
                keyExtractor={(item)=>item.key}
                ref = {"flatList"}
                onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
            />
          </View>     
         
        );
      }
  
  
    }
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,

     
    },
   
  });
  
  
  