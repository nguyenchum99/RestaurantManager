import {
    StyleSheet,
    View,
    Text
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
         nameTable: '',
         total: '',
         keyOrder: ''
         
      };
    }
  
    componentDidMount() {
        const key = this.props.navigation.getParam('key');
        this.setState({keyOrder: key})
    }


    renderTable() {
        //console.log(this.state.orderDetails.orderList[1].foodName)
       // const lng = this.state.orderDetails.orderList.length;
        for(var i = 0; i < 2; i++){
         
            return (
            
                    <DataTable.Row>
                        <DataTable.Cell>{i}</DataTable.Cell>
                        <DataTable.Cell>{i}</DataTable.Cell>
                        <DataTable.Cell>{i}</DataTable.Cell>
                        <DataTable.Cell>{i}</DataTable.Cell>
                   
                    </DataTable.Row> 
    
            )
        }
    }
  
    render() {
    
        this.itemRef.ref(`Orders/${this.state.keyOrder}`).on('value', (snapshot) =>{
            this.state.total = snapshot.child('total').val();  
        });
    
        //this.itemRef.ref(`Orders/${this.state.keyOrder}/orderList`).on('value', (snapshot) =>{
        //     var li = [];
        //     snapshot.forEach((child) => {
        //         li.push({
        //           key: child.key,
        //           name: child.val().foodName,
        //           price: child.val().foodPrice,
        //           amount: child.val().amount,
        //         });
        //       });      
        //       this.setState({data: li})
        //     console.log(this.state.data);
        // });
          

      return (
       <View>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>STT</DataTable.Title>
                    <DataTable.Title >Tên món</DataTable.Title>
                    <DataTable.Title >Đơn giá</DataTable.Title>
                    <DataTable.Title >Số lượng</DataTable.Title>
                </DataTable.Header>
                
                <View>{this.renderTable()}</View>
            
                <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                    console.log(page);
                }}
                label="1-2 of 6"
                />
            </DataTable>
            <Text>tong tien: {this.state.total}</Text>
       </View>
    
      );
    }
  }
  
  const styles = StyleSheet.create({
   
  
  });
  