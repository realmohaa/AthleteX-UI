import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'twrnc';
import GoalsCard from '../components/goalsCard';
import ExcerciseCard from '../components/excerciseCard';
import altImg from '../assets/cover.png';
import { Button } from '@rneui/base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExerciseCategory, excercisesData, focusItems, Excercise } from '../utils/data';

function Home({ navigation }: { navigation: any }): React.JSX.Element {
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);

  const [openGoal, setOpenGoal] = useState(false);
  const [valueGoal, setValueGoal] = useState([]);

  const [openEquipment, setOpenEquipment] = useState(false);
  const [valueEquipment, setValueEquipment] = useState<string[]>([]);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const [isTimeSelected, setIsTimeSelected] = useState(false);

  useEffect(() => {
    setIsTimeSelected(valueTime !== null);
  }, [valueTime]);

  const mapGoalsToImages = (goals: string[]) => {
    return goals.map(goal => {
      const matchingItem = ExerciseCategory.find(item => item.name === goal);
      return { name: goal, img: matchingItem ? matchingItem.img : null };
    });
  };

  const renderWorkoutExperience = () => {
    if (excercisesData.length > 0) {
      return (
        <>
        <View style={tw`flex flex-row justify-center gap-4 py-8`}>
          <View style={tw`flex flex-row items-center gap-2`}>
            <MaterialCommunityIcons name="dumbbell" size={18} color="#55bfa9" />
            <Text style={tw`text-center font-bold opacity-60 text-[14px] `}>{excercisesData.length} Excercises</Text>
          </View>
          <View style={tw`flex flex-row items-center gap-2`}>
            <MaterialCommunityIcons name="clock" size={18} color="#55bfa9" />
            <Text style={tw`text-center font-bold opacity-60 text-[14px] `}>{valueTime} Minutes</Text>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView style={tw`h-[60%]`}>
            {
              excercisesData.map((excercise: Excercise, index: number) => {
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
        </>
      );
    } else {
      return (
        <View style={tw`my-4`}>
          <Text style={tw`text-center`}>Please select the Time at least to begin your workout experience</Text>
        </View>
      );
    }
  };

  return (
    <View style={tw`h-full`}>
      <View style={tw`px-6`}>
        <Header username={'username'}/>
        <View style={tw`flex flex-row justify-between w-full gap-2 z-10`}>
          <DropDownPicker
            showArrowIcon={false}
            containerStyle={{ flex: 1 }} 
            style={tw`bg-[#55bfa9] border-0 rounded-3xl`}
            open={openTime}
            value={valueTime}
            items={focusItems[0].items}
            setOpen={setOpenTime}
            setValue={setValueTime}
            placeholder={'Time Selection'}
            placeholderStyle={tw`text-[11px]`}
          />
          <DropDownPicker
            showArrowIcon={false}
            containerStyle={{ flex: 1 }}
            multiple={true}
            max={3}
            style={tw`bg-[#55bfa9] border-0 rounded-3xl`}
            open={openGoal}
            value={valueGoal}
            items={ExerciseCategory.map(item => ({ label: item.name, value: item.name }))}
            setOpen={setOpenGoal}
            setValue={(valueArray) => {
              setValueGoal(valueArray);
              setSelectedGoals(valueArray);
            }}
            placeholder={'Goal Selection'}
            showTickIcon={false}
            placeholderStyle={tw`text-[11px]`}
          />
          <DropDownPicker
            showArrowIcon={false}
            containerStyle={{ flex: 1 }}
            multiple={true}
            min={0}
            max={3}
            style={tw`bg-[#55bfa9] border-0 rounded-3xl`}
            open={openEquipment}
            value={valueEquipment}
            items={ExerciseCategory.map(item => ({ label: item.name, value: item.name }))}
            setOpen={setOpenEquipment}
            setValue={(valueArray) => {
              setValueEquipment(valueArray);
            }}
            placeholder={('Equipment')}
            placeholderStyle={tw`text-[11px]`}
          />
        </View>
        {selectedGoals.length > 0 ? <GoalsCard selectedGoals={mapGoalsToImages(selectedGoals)} /> : null}
        <View>
          {renderWorkoutExperience()}
        </View>
      </View>
      <View style={tw`absolute bottom-0 flex justify-center items-center w-full py-4`}>
        <Button radius={'xl'} color="#55bfa9" disabled={!isTimeSelected}>Generate Workout</Button>
      </View>
    </View>
  );
}

export default Home;
