import React, {useState} from 'react';
import {
  Pressable,
  Text,
  View,
} from 'react-native';

import tw from 'twrnc';
import { TextInput } from '../../components/text-input';
import wlogo from '../../assets/images/logowhite.png';

import { Image } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Ionicons } from '@expo/vector-icons';

function Register({ navigation }: { navigation: any }): React.JSX.Element {
  const [date, setDate] = useState(new Date());

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
  

  return (
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
        <View style={tw`flex flex-col gap-4 w-3/4`}>
          <TextInput style={tw`rounded-full`} placeholder="Full Name" />
          <TextInput style={tw`rounded-full`} placeholder="Username" />
          <TextInput style={tw`rounded-full`} placeholder="Full Name" />
          <View style={tw`flex flex-row justify-between items-center w-full`}>
          <Text style={tw`bg-neutral-100 border border-black/20 rounded-[18px] px-4 py-2 text-neutral-950 text-neutral-400`}>Date of Birth</Text>
          <Pressable onPress={showDatePicker}>
            <Text style={tw`font-bold text-lg text-[#55bfa9]`}>{date.toDateString()}</Text>
          </Pressable>
          </View>
          <DateTimePickerModal
              isVisible={isDatePickerVisible}
              maximumDate={maxDate}
              mode="date"
              onChange={(selectedDate) => setDate(selectedDate)}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          <TextInput style={tw`rounded-full`} placeholder="Password" />
        </View>
        <Pressable style={tw`flex justify-center items-center rounded-xl border border-[#55bfa9] px-12 py-2 mt-4`}>
          <Text style={tw`text-[#55bfa9] font-bold`}>Create Account</Text>
        </Pressable>
      </View>

      <Text style={tw`absolute bottom-4`}>Myathletex.com</Text>
    </View>
  );
}

export default Register;
