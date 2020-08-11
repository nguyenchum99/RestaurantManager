import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  Alert,
  Dimensions,
  Switch,
} from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      orderDetails: {
      },
    };
  }

  componentDidMount() {
    const orders = this.props.navigation.getParam('orderDetails');
    this.setState({
      orderDetails: orders
    });

    console.log(this.state.orderDetails)
    // //food order
    // this.itemRef
    //   .ref('Orders')
    //   .child(time)
    //   .child(name)
    //   .child('orderList')
    //   .on('value', (snapshot) => {
    //     var li = [];
    //     snapshot.forEach((child) => {
    //       li.push({
    //         key: child.key,
    //         name: child.val().nameFood,
    //         //description: child.val().description,
    //         price: child.val().priceFood,
    //         amoutItem: child.val().amountFood,
    //       });
    //     });
    //     this.setState({ data: li });
    //   });
  }

  render() {
    return (
      <View style={styles.containerView}>
        <Text style={styles.title}>Hóa đơn</Text>

        <FlatList
          data={this.state.orderDetails.orderList}
          renderItem={({ item, index }) => {
            return (
             
              <View
                  style={styles.itemContent}
                >
                  <Image
                    style={styles.imageFood}
                    source={{ uri: item.foodImage }}
                  ></Image>

                  <View
                    style={styles.textContent}>
                    <Text style={styles.nameFood}>
                      {item.foodName}
                    </Text>
                    <Text style={{ color: '#000000' }}>{item.foodPrice} $</Text>
                    <Text style={{ color: '#000000' }}>{item.foodDescripton} </Text>
                  </View>
              </View>
                 
            );
          }}
          keyExtractor={(item) => item.foodKey}
          ref={'flatList'} 
        />
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
    backgroundColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
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
    marginTop: 10,
    height: 80,
    flexDirection: 'column',
    flex: 1,   
  },
  nameFood: {
    fontSize: 15, 
    color: '#3897f1', 
    fontWeight: 'bold'
  },
});
