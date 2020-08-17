import {
    StyleSheet,
    View,
    
  } from 'react-native';
  import React, { Component } from 'react';
  import { DataTable } from 'react-native-paper';
  import { firebaseApp } from '../components/FirebaseConfig';

  
  export default class ConfirmBill extends React.Component {
    constructor(props) {
      super(props);
      this.itemRef = firebaseApp.database();
      this.state = {
         data: [],
         
      };
    }
  
    componentDidMount() {
        const key = this.props.navigation.getParam('keyOrder');

        this.itemRef.ref(`Orders/${key}`).child('orderList').on('value', (snapshot) =>{
            var li = []
            snapshot.forEach((child)=>{
              li.push({
                  foodKey: child.foodKey,
                  foodName:child.val().foodName,
                  foodPrice: child.val().foodPrice,
                  amount: child.val().amount,
               
            });
           
          })
         this.setState({data:li})
         
        })
        
    }


    // renderTable= ()=> {
    //     //console.log(this.state.orderDetails.orderList[1].foodName)
    //    // const lng = this.state.orderDetails.orderList.length;
    //     for(var i = 0; i < 2; i++){
    //         return (
            
    //                 <DataTable.Row>
    //                     <DataTable.Cell>{i}</DataTable.Cell>
    //                     {/* <DataTable.Cell >{this.state.orderDetails.orderList[i].foodName}</DataTable.Cell>
    //                     <DataTable.Cell >{this.state.orderDetails.orderList[i].foodPrice}</DataTable.Cell>
    //                     <DataTable.Cell >{this.state.orderDetails.orderList[i].amount}</DataTable.Cell> */}
    //                 </DataTable.Row> 
    
    //         )
    //     }
    // }
  
    render() {
    
      return (
       <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>STT</DataTable.Title>
                    <DataTable.Title >Tên món</DataTable.Title>
                    <DataTable.Title >Đơn giá</DataTable.Title>
                    <DataTable.Title >Số lượng</DataTable.Title>
                </DataTable.Header>
                
                {/* <View>
                    {this.renderTable()}
                </View> */}
                
                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell ></DataTable.Cell>
                    <DataTable.Cell >12000</DataTable.Cell>
                    <DataTable.Cell >3</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                    console.log(page);
                }}
                label="1-2 of 6"
                />
            </DataTable>
       </View>
    
      );
    }
  }
  
  const styles = StyleSheet.create({
   
  
  });
  