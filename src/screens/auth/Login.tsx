import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';
import Modal from "react-native-modal";
import { Image } from 'react-native';
import tw from 'twrnc';

import logo from '../../assets/images/logo.png';
import wlogo from '../../assets/images/logowhite.png';

import { TextInput } from '../../components/text-input';

function Login({ navigation }: { navigation: any }): React.JSX.Element {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
            <TextInput style={tw`rounded-full`} placeholder="Username / Email" />
            <TextInput style={tw`rounded-full`} placeholder="Password" />
          </View>

          <Pressable style={tw`flex justify-center items-center rounded-full bg-white px-12 py-2 mt-4`}>
            <Text style={tw`text-[#55bfa9] font-bold`}>Login</Text>
          </Pressable>
        </View>
      </Modal>
      <Image source={logo} style={{ width: 250, height: 250 }} />
      <Pressable style={tw`flex justify-center items-center rounded-full bg-[#55bfa9] px-12 py-2 mt-4`} onPress={toggleModal}>
          <Text style={tw`text-slate-100 font-bold`}>Login</Text>
      </Pressable>
      <Pressable style={tw`flex justify-center items-center rounded-full px-12 py-2`} onPress={() => navigation.navigate('Register')}>
          <Text style={tw`font-bold text-xs underline`}>Don't Have an account?</Text>
      </Pressable>
      <Pressable style={tw`flex justify-center items-center rounded-full px-12 py-2`} onPress={() => navigation.navigate('Protected')}>
          <Text style={tw`font-bold text-xs underline`}>HOME TWEAK</Text>
      </Pressable>
      <Text style={tw`absolute bottom-4 text-xs`}>Myathletex.com</Text>
    </View>
  );
}

export default Login;
