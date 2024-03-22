import React, { useReducer, useState } from 'react';
import Header from '../components/header';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'twrnc';
import GoalsCard from '../components/goalsCard';
import ExcerciseCard from '../components/excerciseCard';
import altImg from '../assets/cover.png';
import { ExerciseCategory, excercisesData, focusItems } from '../utils/data';

type excercise = {
  name: string;
  description: string;
  effortLevel: number;
  videoLink: string;
  category: string;
  duration: number;
  reps: number;
  sets: number;
}

function Home({ navigation }: { navigation: any }): React.JSX.Element {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);

  const [openGoal, setOpenGoal] = useState(false);
  const [valueGoal, setValueGoal] = useState(null);

  const [openEquipment, setOpenEquipment] = useState(false);
  const [valueEquipment, setValueEquipment] = useState(null);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const mapGoalsToImages = (goals: string[]) => {
    return goals.map(goal => {
      const matchingItem = ExerciseCategory.find(item => item.name === goal);
      return { name: goal, img: matchingItem ? matchingItem.img : null };
    });
  };

  return (
    <View style={tw`px-6`}>
      <Header username={'username'}/>
      <View style={tw`flex flex-row justify-between w-full gap-2`}>
        <DropDownPicker
          showArrowIcon={false}
          containerStyle={{ flex: 1 }} 
          style={tw`rounded-full bg-[#55bfa9] border-0`}
          open={openTime}
          value={valueTime}
          items={focusItems[0].items}
          setOpen={setOpenTime}
          setValue={setValueTime}
          placeholder={'Time Selection'}
          placeholderStyle={tw`text-[11px] text-center`}
        />
        <DropDownPicker
          showArrowIcon={false}
          containerStyle={{ flex: 1 }}
          multiple={true}
          max={3}
          style={tw`rounded-full bg-[#55bfa9] border-0`}
          open={openGoal}
          value={valueGoal}
          items={ExerciseCategory.map(item => ({ label: item.name, value: item.name }))}
          setOpen={setOpenGoal}
          setValue={(valueArray) => {
            setValueGoal(valueArray);
            setSelectedGoals(valueArray);
          }}
          placeholder={'Goal Selection'}
          placeholderStyle={tw`text-[11px] text-center`}
        />
        <DropDownPicker
          showArrowIcon={false}
          containerStyle={{ flex: 1 }} 
          style={tw`rounded-full bg-[#55bfa9] border-0`}
          open={openEquipment}
          value={valueEquipment}
          items={focusItems[1].items}
          setOpen={setOpenEquipment}
          setValue={setValueEquipment}
          placeholder={'Equipment'}
          placeholderStyle={tw`text-[11px] text-center`}
        />
      </View>
      {selectedGoals.length > 0 ? <GoalsCard selectedGoals={mapGoalsToImages(selectedGoals)} /> : null}
      <View>
        <Text style={tw`text-center font-bold py-8 text-lg`}>{excercisesData.length} Excercises -- Time of workout</Text>
        <SafeAreaView>
          <ScrollView style={tw`h-[65%]`}>
            {
              excercisesData.map((excercise: excercise, index: number) => {
                return (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => navigation.navigate('Detail', { excercise })}
                  >
                    <ExcerciseCard
                      name={excercise.name}
                      count={excercise.duration}
                      reps={excercise.reps}
                      img={altImg}
                    />
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

export default Home;
