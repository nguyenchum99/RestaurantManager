import { StyleSheet, Text, View, TextInput, 
     Image, ActivityIndicator, Button, Dimensions, 
     Alert, KeyboardAvoidingView, 
     TouchableWithoutFeedback,
     Keyboard,} from 'react-native';
import React, {Component} from 'react';
import { firebaseApp } from './FirebaseConfig';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-picker';

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


const uploadImage = (uri, mime = 'img/jpg') => {
    return new Promise((resolve, reject) =>{
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri, 'base64')
        .then((data) => {
            return Blob.build(data, {type: `${mime}; BASE64`});

        })
        .then((blob)=>{
            uploadBlob = blob
            return imageRef.put(blob, {contentType: mime})
        })
        .then(() =>{
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url) => {
            resolve(url)
        })
        .catch((error) =>{
            reject(error)
        })
    })
  }


window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
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

      addNewFood(){

        if(this.state.foodName.length == 0 ||
          this.state.foodDescription.length == 0 ||
          this.state.foodPrice.length == 0  ){
            alert("Bạn phải nhập đầy đủ thông tin")
          }else{
            Alert.alert(
              'Thông báo',
              'Bạn có chắc muốn tạo món mới không ?',
              [
                {
                  text: 'Không',
                  onPress: () => console.log('Cancel'),
                  style: 'cancel',
                },
                {
                  text: 'Có',
                  onPress: () => {
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
                    this.props.navigation.navigate('ListFood')
                    return <ActivityIndicator size="small" color="#0000ff" />
                   // this.props.navigation.navigate('ListFood')
                    
                  },
                },
              ],
              { cancelable: false }
            );

          }
      }



      pickImageFood(){
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({foodImage: ''})
            if (response.didCancel) {
              
            } else if (response.error) {
              
            } else if (response.customButton) {
            } else {
              const source = { uri: response.uri };
              console.log("source image:" + source)
              this.setState({
                foodImage: response.uri,
              });

              uploadImage(response.uri).then(url => this.setState({foodImage}))
              .catch(error =>console.log(error))

            }
          });
      }

      render(){
      
        return (
          
          <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerView}>

                <View style ={styles.contentImage}>
                  <TouchableOpacity
                      onPress = {() => {this.pickImageFood()}}
                  >
                      <Text>Thêm ảnh</Text>
                      <Image style={{width: 40, height: 40}}
                      source= {require('../icons/icons8-add-image-40.png')}
                    ></Image>
                  </TouchableOpacity> 

                  <Image style = {styles.imageFood}
                   source ={{  uri: this.state.foodImage }}></Image>
                  
                </View>

                <Text style = {styles.text}>Tên món</Text>
            
                <TextInput 
                    style = {styles.input}
              
                    onChangeText={(foodName) => this.setState({foodName})}
                    value = {this.state.foodName}
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs.textDescription.focus()}>
                </TextInput>

                <Text style = {styles.text}>Mô tả</Text>
      
                <TextInput 
                    ref={'textDescription'}
                    style = {styles.textDescription}
                  
                 
                    onChangeText={(foodDescription) => this.setState({foodDescription})}
                    value = {this.state.foodDescription}
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs.txtPrice.focus()}
                    
                ></TextInput>

                <Text style = {styles.text}>Giá</Text>
      
                <TextInput 
                    ref={'txtPrice'}
                    style = {styles.input}
                  
                    keyboardType = 'numeric'
                    onChangeText={(foodPrice) => this.setState({foodPrice})}
                    value = {this.state.foodPrice}
                    returnKeyType="go">
                </TextInput>

                <TouchableOpacity style = {styles.button} onPress= {() => this.addNewFood()}>
                  <Text style = {styles.textButton}>Tạo món</Text>
                </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        );
      }


}

const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      flexDirection: 'column'
      
    },
    text: {
      marginLeft: 20
    },
    contentImage: {
      flexDirection: 'row',
      marginLeft: 20,
      marginTop: 20
    },
    imageFood: {
      height: 200,
      width: 200,
      borderRadius: 100
    },
    input: {
        borderWidth: 1,
        borderColor: '#3399ff',
        margin: 20,
        borderRadius: 10
    },
    textDescription: {
      margin: 20,
      borderWidth: 1,
      borderColor: '#3399ff',
      borderRadius: 10
      
    },
    button: {
      margin: 20,
      backgroundColor: '#3399ff',
      height: 40,
      borderRadius: 10
    },
    textButton: {
      color: '#ffffff',
      textAlign: 'center',
      marginTop: 10
      
    }

  });
  
  
  