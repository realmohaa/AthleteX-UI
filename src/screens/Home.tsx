import React, { useReducer, useState } from 'react';
import Header from '../components/header';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'twrnc';
import GoalsCard from '../components/goalsCard';

type FocusItem = {
  name: string;
  items: { label: string; value: string }[];
};

type DropdownState = {
  open: boolean;
  value: string | null;
};

const focusItems:  FocusItem[] = [
  {
    name: 'Time Selection',
    items: [
      {label: '60', value: 'apple'},
      {label: '30', value: 'banana'},
      {label: '15', value: 'pear'},
    ]
  },
  {
    name: 'Goal Selection',
    items: [
      {label: 'Shooting', value: 'Shooting'},
      {label: 'Finishing', value: 'Finishing'},
      {label: 'Dribbeling', value: 'Dribbeling'},
    ]
  },
  {
    name: 'Equipment',
    items: [
      {label: '60', value: 'apple'},
      {label: '30', value: 'banana'},
      {label: '15', value: 'pear'},
    ]
  },
]

function Home({ navigation }: { navigation: any }): React.JSX.Element {
  const initialState = focusItems.map(() => ({ open: false, value: null }));
  const [state, setState] = useReducer((state:any, newState:any) => newState.map((item:any, i:any) => ({...state[i], ...item})), initialState);
  return (
    <View>
      <Header username={'username'}/>
      <View style={tw`flex flex-row justify-between w-full gap-2 px-6`}>
        {
          focusItems.map((item, index) => {
            return (
              <DropDownPicker
                showArrowIcon={false}
                containerStyle={{ flex: 1 }} 
                style={tw`rounded-full bg-[#55bfa9] border-0`}
                key={index}
                open={state[index].open}
                value={state[index].value}
                items={item.items}
                setOpen={open => {
                  const newState = [...state];
                  newState[index] = { ...newState[index], open };
                  setState(newState);
                }}
                setValue={(value) => {
                  const newState = [...state];
                  newState[index] = { ...newState[index], value };
                  setState(newState);
                  console.log(`New value for dropdown ${index}:`, value); // Log the new value
                  console.log(`Updated state:`, newState); // Log the updated state
                }}
                placeholder={item.name}
                placeholderStyle={tw`text-[11px] text-center`}
              />
            )
          })
        }
      </View>
      <GoalsCard username={''}/>
      <Text style={tw`text-center font-bold py-8 text-lg`}># of excercises -- Time of workout</Text>
    </View>
  );
}

export default Home;
