import React, { useState } from 'react';
import {
  Pressable,
  Text,
  View,
  Image
} from 'react-native';
import Modal from "react-native-modal";
import tw from 'twrnc';
import { Button } from '@rneui/themed';
import { TextInput } from '../../components/text-input';
import axios from 'axios';

// Logo Imports
import logo from '../../assets/images/logo.png';
import wlogo from '../../assets/images/logowhite.png';
import ApiClient from '../../utils/api_client';
import { LOGIN_ENDPOINT } from '../../utils/consts';

function Login({ navigation }: { navigation: any }): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // give type to navigation
  const handleLogin = async (navigation: any) => {
    try {

      setIsLoading(true)

      const response = await ApiClient.getInstance().post(LOGIN_ENDPOINT, {
        username,
        password
      });

      console.log(response.data)
      navigation.navigate('Protected')
      
      setIsLoading(false)
      setModalVisible(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  };

  return (
    <View
      style={tw`flex flex-col items-center justify-center h-full w-full px-8`}
    >
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={tw` p-12 w-full max-w-sm flex items-center bg-[#55bfa9] rounded-3xl`}>
          <View style={tw`flex flex-row items-center justify-center mb-4`}>
            <Text style={tw`text-2xl text-[#3c403d]`}>Athlete</Text>
            <Image source={wlogo} style={tw`w-[75px] h-[75px]`} />
          </View>
          <View style={tw`flex flex-col gap-4 w-full`}>
              <TextInput 
                style={tw`rounded-full`} 
                placeholder="Username / Email" 
                value={username}
                onChangeText={setUsername}
              />
              <TextInput 
                style={tw`rounded-full`} 
                placeholder="Password" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
          </View>
          <Button 
            radius={"xl"} 
            color="white" 
            titleStyle={{padding:28, color:"#55bfa9"}} 
            containerStyle={{marginTop:15}} 
            onPress={() => handleLogin(navigation)}
            loading={isloading}
            loadingProps={{
              size: 'small',
              color: 'rgba(111, 202, 186, 1)',
            }}
            >
            Login
          </Button>
        </View>
      </Modal>
      <Image source={logo} style={{ width: 250, height: 250 }} />
      <Button radius={"xl"} color="#55bfa9" titleStyle={{padding:28}} onPress={toggleModal}>Login</Button>
      <Button type="clear" titleStyle={{color:"black", fontSize:12, textDecorationLine:"underline"}} onPress={() => navigation.navigate('Register')}>Don't Have an account?</Button>
      <Pressable style={tw`flex justify-center items-center rounded-full px-12 py-2`} onPress={() => navigation.navigate('Protected')}>
          <Text style={tw`font-bold text-transparent text-xs underline`}>HOME TWEAK</Text>
      </Pressable>
      <Text style={tw`absolute bottom-4 text-xs`}>Myathletex.com</Text>
    </View>
  );
}

export default Login;
