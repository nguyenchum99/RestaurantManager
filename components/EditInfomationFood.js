import { StyleSheet, Text, View, TextInput, 

    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Dimensions,
    Alert} from 'react-native';
import React, {Component} from 'react';
import {firebaseApp} from '../components/FirebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

export default class EditInfoFood extends React.Component{
    
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            keyFood: '',
            newFoodDesciption: '',
            newFoodPrice: '',
            newImage: '',
            imageFood2: '',
            time: '',
           
        };
    }

    componentDidMount() {
        const key = this.props.navigation.getParam('keyFood');
        this.setState({keyFood: key})
        firebaseApp.database().ref(`Foods/${key}`).once('value', (snapshot) => {
            this.state.newFoodName = snapshot.child('name').val();
            this.state.newFoodDesciption = snapshot.child('description').val();
            this.state.newFoodPrice = snapshot.child('price').val();
            this.state.newImage = snapshot.child('imageUrl').val();
            
        });

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        this.setState({
          //Setting the value of the date time
          time:
            date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        });
      }

    updateInfoFood= () => {
        Alert.alert(
            'Alert Title',
            'Bạn có chắc muốn cập nhật thông tin',
            [
              {
                text: 'Hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => {
                    this.itemRef.ref(`Foods/${this.state.keyFood}`).update({
                        name: this.state.newFoodName,
                        description: this.state.newFoodDesciption,
                        price: this.state.newFoodPrice,
                        imageUrl: this.state.newImage,
                        timeUpdate: this.state.time
                    });
                    alert('Cập nhật thành công');
                    this.props.navigation.navigate('list');
                }
             },
            ],
            { cancelable: false }
          );
    }
    

    pickImageFood= () =>{
    
        ImagePicker.showImagePicker(options, (response) => {
            this.setState({newImage: ''})
            if (response.didCancel) {
              
            } else if (response.error) {
              
            } else if (response.customButton) {
            } else {
              const source = { uri: response.uri };
              console.log("source image:" + source)
              this.setState({
                newImage: response.uri,
              });

              uploadImage(response.uri).then(url => this.setState({newImage}))
              .catch(error =>console.log(error))

            }
          });
        
      }

    render(){
    

        return (
       
            <View   style = {styles.contentView}           
            >
                <Text style={styles.title}>Thông tin món ăn</Text>
                <Text style={styles.foodName}>{this.state.newFoodName}</Text>
                <Text style = {styles.text}>Mô tả:</Text>
                <TextInput 
                    multiline={true}
                    style = {styles.textInput}
                    onChangeText = {(text) => this.setState({newFoodDesciption: text})}
                    value = {this.state.newFoodDesciption}
                    placeholder = {this.state.newFoodDesciption}
                ></TextInput>
                <Text style = {styles.text}>Đơn giá: ($)</Text>
                <TextInput 
                    style = {styles.textPrice}
                    onChangeText = {(text) => this.setState({newFoodPrice: text})}
                    value = {this.state.newFoodPrice}
                    placeholder = {this.state.newFoodPrice}
                    keyboardType = 'numeric'
                ></TextInput>

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
                    source ={{  uri: this.state.newImage }}></Image>
                     
                    <Image style = {styles.imageFood2}
                    source ={{  uri: this.state.newImage }}></Image>
                    
                </View>

                <TouchableOpacity style = {styles.button} onPress = {() => this.updateInfoFood()}>
                    <Text style = {styles.textButton}>Cập nhật</Text>
                </TouchableOpacity>
           </View>
         
        )
    }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    contentView: {
        flex: 1,
        flexDirection: 'column'
    },
    title: {
        color: '#ff4d4d',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    foodName: {
        color: '#ff4d4d',
        marginLeft: 20,
        fontSize: 15,
       
    },
    text:{
        marginTop: 20,
        marginLeft: 20,
        color: '#000000'
    },
    textPrice: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#4db8ff',
        borderRadius: 10,
        borderWidth: 0.5,
        flex: 1,
    },
    textInput: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#4db8ff',
        borderRadius: 10,
        borderWidth: 0.5,
        lineHeight: 20,
        flex: 3,
        textAlignVertical: 'top'
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
        
      },
      contentImage: {
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 20,
        flex: 2
      },
      imageFood: {
        height: 80,
        width: 80,
        borderRadius: 50
      },
      imageFood2: {
        height: 80,
        width: 80,
        borderRadius: 50 ,
        marginLeft: 20  
      }
});