import { StyleSheet, Text, View, TextInput, 
     Image, Platform, ActivityIndicator, Button, Dimensions} from 'react-native';
import React, {Component} from 'react';
import { firebaseApp } from './FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';
import Modal from 'react-native-modalbox';

const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


// const uploadImage = (uri, mime = 'img/jpg') => {
//     return new Promise((resolve, reject) =>{
//         const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//         const sessionId = new Date().getTime();
//         let uploadBlob = null;
//         const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

//         fs.readFile(uploadUri, 'base64')
//         .then((data) => {
//             return Blob.build(data, {type: `${mime}; BASE64`});

//         })
//         .then((blob)=>{
//             uploadBlob = blob
//             return imageRef.put(blob, {contentType: mime})
//         })
//         .then(() =>{
//             uploadBlob.close()
//             return imageRef.getDownloadURL()
//         })
//         .then((url) => {
//             resolve(url)
//         })
//         .catch((error) =>{
//             reject(error)
//         }
//         )
//     })
// }

var screen = Dimensions.get('window');
export default class AddNewFood extends React.Component{

    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
          foodName: '',
          foodDescription: '',
          foodPrice: '',
          foodImage: '',
          foodCreateAt: '',
          // dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => 1 != r2}),
        
        }
      }

      //ham lay thoi gian thuc
      componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
          //Setting the value of the date time
          foodCreateAt:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
      }

      showAddModal(){
        this.refs.myModal.open();
      }

      addNewFood(){
        this.itemRef.ref('Foods').push({
          name: this.state.foodName,
          description: this.state.foodDescription,
          price: this.state.foodPrice,
          imageUrl: this.state.foodImage,
          createAt: this.state.foodCreateAt,
          timeUpdate: '',
        });
    
        this.setState({
          foodName: '',
          foodDescription: '',
          foodPrice: '',
          foodImage: '',
          foodCreateAt: ''
        })
       this.refs.myModal.close();

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

      //           uploadImage(response.uri).then(url => this.setState({foodImage}))
      //           .catch(error =>console.log(error))

      //         // let source = {uri: response.uri};
      //         // this.setState({foodImage: source})
      //       }
      //     });
      // }

      render(){
      
        return (

          <Modal  ref = {"myModal"}
            style = {{
              justifyContent: 'center',
              borderRadius: 10, 
              shadowRadius: 10,
              width: screen.width - 80,
              height: 300
             
            }}           
            position = 'center'
            backdrop = {true}
            onClosed ={() => {
            }}
            >
            <Text style={{fontWeight: 'bold', fontSize: 15, marginLeft: 20}}>Thêm món mới</Text>
           
{/*          
            <TouchableOpacity
                onPress = {() => {this.pickImageFood()}}
            >
                <Text>Add Image Food</Text>
                <Image style={{width: 40, height: 40}}
                source= {require('../icons/icons8-add-image-40.png')}
               ></Image>
            </TouchableOpacity> */}

            {/* <Image source = {this.state.foodImage} style={{width: 100, height: 100}}></Image> */}

            <TextInput 
                style = {styles.input}
                placeholder="Tên món"
                onChangeText={(foodName) => this.setState({foodName})}
                value = {this.state.foodName}>
             </TextInput>
  
            <TextInput 
                style = {styles.input}
                placeholder="Mô tả"
                onChangeText={(foodDescription) => this.setState({foodDescription})}
                value = {this.state.foodDescription}
            ></TextInput>
  
            <TextInput 
                style = {styles.input}
                placeholder="Giá"
                keyboardType = 'numeric'
                onChangeText={(foodPrice) => this.setState({foodPrice})}
                value = {this.state.foodPrice}>
            </TextInput>

            <Button title='Thêm' onPress= {() => this.addNewFood()} />
                
          </Modal>     
        );
      }


}

const styles = StyleSheet.create({
    containerView: {
      width: 350,
      marginTop: 20,
      marginLeft: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#eaeaea',
        margin: 10
    }
  });
  
  
  