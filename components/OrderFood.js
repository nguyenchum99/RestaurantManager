import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
 
} from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class OrderFood extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      data: [],
      nameTable: '',
      amountOrder: 0,
      orderDetails: {
        orderList: [],
        table: '',
        timeOrdered: '',
        dateOrdered: '',
        monthOrdered: '',
        yearOrdered: ''
      },
      backgroundColor: '#ffffff'
    };
  }

  componentDidMount() {
    const name = this.props.navigation.getParam('nameTable');
    // const orders = this.props.navigation.getParam('orderDetails');
    // this.setState({
    //   orderDetails: orders,
    // });
    //read flat list food
    this.itemRef.ref('Foods').on('value', (snapshot) => {
      var li = [];
      snapshot.forEach((child) => {
        li.push({
          key: child.key,
          name: child.val().name,
          description: child.val().description,
          price: child.val().price,
          imageUrl: child.val().imageUrl,
        });
      });
      this.setState({ data: li });
    });

    this.state.orderDetails.table = name;
    
  }

  orderFood (key, index){
    
    this.setState({backgroundColor: '#ccffe6'})
    this.setState({amountOrder: this.state.amountOrder + 1})
     this.state.orderDetails.orderList.push({
      'foodKey': this.state.data[index].key,
      'foodName': this.state.data[index].name,
      'foodDescripton': this.state.data[index].description,
      'foodPrice': this.state.data[index].price,
      'foodImage': this.state.data[index].imageUrl,
      'amount' : 1
     });

     console.log(this.state.orderDetails.orderList);  

  }

  render() {
    
    //var {amountOrder} = this.state.orderDetails.orderList.length; 
    return (
      <View style={styles.containerView}>

      {/* list food */}
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity  
              onPress={() => this.orderFood(item.key, index)}>
                <View
                  style={styles.itemContent}
                >
                  <Image
                    style={styles.imageFood}
                    source={{ uri: item.imageUrl }}
                  ></Image>

                  <View
                    style={styles.textContent}>
                    <Text style={styles.nameFood}>
                      {item.name}
                    </Text>
                    <Text style={styles.text}>{item.price} $</Text>
                    <Text style={styles.text}>{item.description} </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.key}
          ref={'flatList'}
        />

        <View style = {styles.cartView}>
          <Image
            style={ styles.imageCart}
            source={require('../icons/icons8-favorite-cart-100.png')}
          ></Image>

          <Text
            style={styles.cartText}>{this.state.amountOrder}</Text>


          <TouchableOpacity
            style={styles.clickView}
              onPress={() => {
              const { orderDetails } = this.state;
              this.props.navigation.navigate('Bill', {
                orderDetails: this.state.orderDetails
              });
            }}
          >
            <Text style={{ color: '#ffffff', margin: 5 }}>Thêm vào giỏ hàng</Text>
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
  title: {
    fontWeight: 'bold', 
    fontSize: 15, 
    marginTop: 20, 
    marginLeft: 20, 
    color: '#000000'
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#ff4d4d'
    
  },
  imageFood: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textContent: {
    marginLeft: 10,
    marginTop: 20,
    height: 80,
    flexDirection: 'column',
    flex: 1,   
  },
  nameFood: {
    fontSize: 15, 
    color: '#ffffff', 
    fontWeight: 'bold'
  },
  text: {
    color: '#ffffff', 
  },
  cartView: {
    height: 50,
    backgroundColor: 'red',
    flexDirection: 'row',
  },
  cartText: {
    color: '#ffffff',
    fontWeight: 'bold',
    height: 30,
    width: 30,
    marginTop: 17,
    marginLeft: 10,
    fontSize: 17
  },
  clickView: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    marginLeft: 150,
    marginTop: 10,   
  },
  imageCart: {
    width: 35,
    height: 35,
    marginTop: 10,
    marginLeft: 20,
  }
});
