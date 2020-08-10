

import { StyleSheet, Text, View, TextInput, 
    Button, FlatList, Image, Alert, Dimensions, Switch} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import Swipeout from 'react-native-swipeout';
import AddNewFood from './AddNewFood';
import EditFood from './EditInfoFood';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';

const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

//render item flatlist
class FlatListItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            activeRowKey: null
        }
      
    }

      // pickImageFood(){
      //   ImagePicker.showImagePicker(options, (response) => {
      //       this.setState({foodImage: ''})
      //       if (response.didCancel) {
              
      //       } else if (response.error) {
              
      //       } else if (response.customButton) {
      //       } else {
      //         const source = { uri: response.uri };
      //         this.setState({
      //           foodImage: source,
      //         });

      //           // uploadImage(response.uri).then(url => this.setState({foodImage}))
      //           // .catch(error =>console.log(error))

      //         let source = {uri: response.uri};
      //         this.setState({foodImage: source})
      //       }
      //     });
      // }

    render(){


        const swipeoutSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null)
                    this.setState({activeRowKey: null});
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key});
            },
            right: [
                {
                    onPress: ()=>{
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            "Cảnh báo",
                            "Bạn có chắc muốn xóa không ?",
                            [
                             
                              {
                                text: "Không",
                                onPress: () => console.log("Cancel"),
                                style: "cancel"
                              },
                              {
                                  text: "Có",
                                  onPress: () =>{
                                    firebaseApp.database().ref('Foods').child(deletingRow).remove();
                                    this.props.parentFlatList.refreshFlatList(deletingRow);
                                  }
                              }
                        
                            ],
                            { cancelable: false }
                          );

                    },
                    text: 'Xóa', type: 'delete'
                },
                {
                    onPress: () =>{
                        // alert("Update");
                        this.props.parentFlatList.refs.editModal
                        .showEditModal(firebaseApp.database().ref('Foods')
                        .child(this.state.activeRowKey), this);
                    },
                    text: 'Sửa', type: 'primary'
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        }
        return (

                <Swipeout {...swipeoutSetting}>
                    <View style ={{flex: 1, 
                        backgroundColor: 'white', 
                        borderWidth: 1,
                        flexDirection: 'row',
                        borderRadius: 10,
                        marginTop: 15,
                        marginLeft: 15, 
                        marginRight: 15
                    }}>
                        {/* <TouchableOpacity  onPress = {() => {this.pickImageFood()}}>
                            <Image style={{width: 80, height: 80,marginLeft: 10, marginTop: 10, marginBottom: 10}}
                                source = {require('../icons/icons8-add-80.png')}
                            ></Image> */}

                            <Image style={{width: 100, height: 100, borderRadius: 50, marginLeft: 10, marginTop: 10, marginBottom: 10}} 
                                source = {{uri: this.props.item.imageUrl}}></Image>
                        {/* </TouchableOpacity> */}

                        <View style = {{marginLeft: 10, height: 80, flexDirection: 'column', flex: 1}}>
                            <Text style = {{fontSize: 15, color: '#3897f1',fontWeight: 'bold'}}>{this.props.item.name}</Text>
                            <Text>Giá: {this.props.item.price} $</Text>
                            <Text>Mô tả: {this.props.item.description}</Text>
                        </View>
                    </View>
                
                </Swipeout>
           
        );
    }
}


export default class FlatListFoods extends React.Component{

    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
         this.state = {
           data : [],
           deletedRowKey: null
         }

       
      }

    componentDidMount(){
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
      })
     }


     refreshFlatList = (deletedKey) =>{
         this.setState((prevState) => {
             return {
                 deletedRowKey: deletedKey
             };
         });
        
     }


     onPressAdd(){
        //  alert("you add item");
        this.refs.addModal.showAddModal();
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

                <Text style={{marginLeft: 20, fontWeight: 'bold', color: '#ffffff'}}>Thêm mới món ăn</Text>
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
            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20, marginLeft: 20}}>Menu</Text>
            <FlatList style = {{flex :1}} 
                data = {this.state.data} 
                renderItem={ ({item, index}) => {
                    return(
                        <FlatListItem item = {item} index= {index} parentFlatList={this}></FlatListItem>
                    );
                    }
                }
                keyExtractor={(item)=>item.key}
                ref = {"flatList"}
                onContentSizeChange={()=> this.refs.flatList.scrollToEnd()}
            />
            <AddNewFood ref ={'addModal'} parentFlatList = {this}></AddNewFood>
            <EditFood ref={'editModal'} parentFlatList={this}></EditFood>

          </View>     
        );
      }
  
  
  }
  
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
     
    },
   
  });
  
  
  