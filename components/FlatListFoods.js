import { StyleSheet, Text, View, FlatList, Image, Alert } from 'react-native';
import React, { Component } from 'react';
import { firebaseApp } from '../components/FirebaseConfig';
import Swipeout from 'react-native-swipeout';
import AddNewFood from './AddNewFood';
import EditFood from './EditInfoFood';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


//render item flatlist
class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
    };
  }


  clickItemFood() {
      //alert("sdjfsd")
      this.setState({ activeRowKey: this.props.item.key });
      Alert.alert(
        'Món ăn',
        '',
        [
          {
            text: 'Xóa món ăn',
            onPress: () => {
              Alert.alert(
                'Cảnh báo',
                'Bạn có chắc muốn xóa không ?',
                [
                  {
                    text: 'Không',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                  },
                  {
                    text: 'Có',
                    onPress: () => {
                      firebaseApp.database().ref('Foods').child(this.state.activeRowKey).remove();
                      this.props.parentFlatList.refreshFlatList(this.state.activeRowKey);
                    },
                  },
                ],
                { cancelable: false }
              );
            },
            style: 'cancel',
          },
          {
            text: 'Sửa thông tin',
            onPress: () => {
              this.props.parentFlatList.refs.editModal.showEditModal(
                firebaseApp.database().ref('Foods').child(this.state.activeRowKey),
                this
              );
            },
          },
        ],
        { cancelable: false }
      );
  }


  render() {
    
    return (
     
      <TouchableOpacity   onPress = {() => this.clickItemFood()}>
        <View style={styles.contentItem}>
          <Image
            style={styles.imageItem}
            source={{ uri: this.props.item.imageUrl }}
          ></Image>

          <View style={styles.textItem}>
            <Text style={styles.nameItem}>
              {this.props.item.name}
            </Text>
            <Text style = {styles.text}>Giá: {this.props.item.price} $</Text>
            <Text style = {styles.text}>Mô tả: {this.props.item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default class FlatListFoods extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      data: [],
      deletedRowKey: null,
    };
  }

  componentDidMount() {
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
  }

  refreshFlatList = (deletedKey) => {
    this.setState((prevState) => {
      return {
        deletedRowKey: deletedKey,
      };
    });
  };

  onPressAdd() {
    //  alert("you add item");
    this.refs.addModal.showAddModal();
  }

  render() {
    return (
      <View style={styles.containerView}>
        <FlatList
          style = {styles.flatList}
          data={this.state.data}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} parentFlatList={this}></FlatListItem>;
          }}
          keyExtractor={(item) => item.key}
          ref={'flatList'}
          onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
        />
        {/* <AddNewFood ref={'addModal'} parentFlatList={this}></AddNewFood> */}
        <EditFood ref={'editModal'} parentFlatList={this}></EditFood>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  contentItem: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 10,
      marginTop: 15,
      marginLeft: 15,
      marginRight: 15,
      borderWidth: 1,
      borderColor: '#ff4d4d',
      backgroundColor: '#ff4d4d'
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textItem: {
    flex: 1,
    marginLeft: 10,
    height: 80, 
    flexDirection: 'column',
  },
  nameItem: {
    fontSize: 15, 
    color: '#ffffff',
    fontWeight: 'bold'
  },
  text: {
    color: '#ffffff',
  },
  flatList: {
    flex: 1
  }
});
