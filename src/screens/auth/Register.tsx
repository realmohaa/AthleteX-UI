import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from 'react-native-paper';
import tw from 'twrnc';

import wlogo from '../../assets/images/logowhite.png';

import { Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../../components/customInput';
import ApiClient from '../../utils/api_client';
import { REGISTER_ENDPOINT } from '../../utils/consts';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import { platformStyles } from '../../utils/data';

function Register({ navigation }: { navigation: any }): React.JSX.Element {
  const [isloading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate the date 18 years before the current date
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
  };

  const handleSumit = async () => {
    try {
      setIsLoading(true)
      await ApiClient.getInstance().post(REGISTER_ENDPOINT, {
        username,
        fullName,
        email,
        DOB: date,
        password
      }).then(async (response) => {
        navigation.navigate('Login')
      })
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  };

  return (
    <>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={platformStyles.container}
    >
    <View
      style={tw`flex flex-col items-center justify-center h-full w-full`}
    >
      <View style={tw`absolute top-0 w-full flex items-center bg-[#55bfa9]`}>
        <Pressable style={tw`flex items-start w-full py-10 px-6`} onPress={() => navigation.navigate('Login')}>
        <Ionicons name="arrow-back" size={28} color="white" />
        </Pressable>
        <View style={tw`flex flex-row items-center justify-center -mt-12 pb-4`}>
          <Text style={tw`text-3xl text-[#3c403d]`}>Athlete</Text>
          <Image source={wlogo} style={tw`w-[100px] h-[100px]`} />
        </View>
      </View>
      <View style={tw`w-full flex items-center`}>
        <Text style={tw`uppercase font-bold text-[#55bfa9] text-2xl py-8`}>My Athlete X Account</Text>
        <Formik 
            initialValues={[username, fullName, email, password]} 
            onSubmit={handleSumit}
        >
        <View style={tw`flex flex-col gap-4 w-3/4`}>
          <CustomInput placeholder="Username" name={username} setName={setUsername} />
          <CustomInput placeholder="Full Name" name={fullName} setName={setFullName} />
          <CustomInput placeholder="Email" name={email} setName={setEmail} />
          <View style={tw`flex flex-row justify-between items-center w-full`}>
            <Text style={tw`bg-neutral-100 border border-black/20 rounded-[18px] px-4 py-2 text-neutral-950 text-neutral-400`}>Date of Birth</Text>
            <Pressable onPress={showDatePicker}>
              <Text style={tw`font-bold text-lg text-[#55bfa9]`}>{date}</Text>
            </Pressable>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            maximumDate={maxDate}
            mode="date"
            onChange={(selectedDate) => setDate(selectedDate.toISOString().split('T')[0])}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <CustomInput placeholder="Password" name={password} setName={setPassword} isSecured/>
        <Button 
          disabled={username === '' || email === '' || fullName === '' || password === '' ? true : false}
          loading={isloading}
          mode='outlined'
          buttonColor='transparent'
          textColor='#55bfa9'
          style={tw`border-[#55bfa9] mt-4`}
          >
            Create Account
        </Button>
        </View>
        </Formik>
      </View>
    </View>
    </KeyboardAvoidingView>
    <Text style={tw`absolute bottom-4 text-center w-full`}>Myathletex.com</Text>
    </>
  );
}

export default Register;
