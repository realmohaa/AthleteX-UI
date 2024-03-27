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
import { ExerciseCategory, excercisesData, focusItems, Exercise, WorkoutData } from '../utils/data';
import { getData, storeData } from '../utils/util';
import ApiClient from '../utils/api_client';
import { WORKOUT_ENDPOINT } from '../utils/consts';

function Home({ navigation }: { navigation: any }): React.ReactElement {

  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);

  const [openGoal, setOpenGoal] = useState(false);
  const [valueGoal, setValueGoal] = useState([]);

  const [openEquipment, setOpenEquipment] = useState(false);
  const [valueEquipment, setValueEquipment] = useState<string[]>([]);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [workout, setWorkout] = useState<WorkoutData | null>(null);
  const [isWorkoutLoading, setIsWorkoutLoading] = useState(false);

  const [userDetails, setUserDetails] = useState<{
    data: {
      user: {
        username: string,
        tokens: {
          accessToken: string
        }
      } 
    }
  } | undefined>();;

  
  const handleWorkout = async () => {
    try {
      console.log(userDetails?.data.user.tokens.accessToken)
      setIsWorkoutLoading(true)
      await ApiClient.getInstance().post(WORKOUT_ENDPOINT, {
        timeAllocated: valueTime,
        exerciseCategories: valueGoal
      }, {
        headers: {
          'Authorization': `Bearer ${userDetails?.data.user.tokens.accessToken}`
        }
      }).then(async (response) => {
        setWorkout(response.data.data);
        await storeData(response.data.data, 'user-workout')
        setValueGoal([])
        setValueTime(null)
      })
    } catch (e) {
      console.log(e)
    }
    setIsWorkoutLoading(false)
  };
  
  const fetchUser = async () => {
    const user = await getData('user');
    setUserDetails(user);
    return userDetails;
  }

  const fetchWorkout = async () => {
    const workoutData = await getData('user-workout');
    setWorkout(workoutData);
    return workoutData;
  }

  useEffect(() => {
    fetchUser()
    fetchWorkout()
    setIsTimeSelected(valueTime !== null);
  }, [valueTime]);

  const mapGoalsToImages = (goals: string[]) => {
    return goals.map(goal => {
      const matchingItem = ExerciseCategory.find(item => item.name === goal);
      return { name: goal, img: matchingItem ? matchingItem.img : null };
    });
  };

  const renderWorkoutExperience = () => {
    console.log(workout?.exercises);
    if (workout?.exercises?.length ?? 0 > 0) {
      return (
        <>
        <View style={tw`flex flex-row justify-center gap-4 py-8`}>
          <View style={tw`flex flex-row items-center gap-2`}>
            <MaterialCommunityIcons name="dumbbell" size={18} color="#55bfa9" />
            <Text style={tw`text-center font-bold opacity-60 text-[14px] `}>{workout?.exercises?.length} Excercises</Text>
          </View>
          <View style={tw`flex flex-row items-center gap-2`}>
            <MaterialCommunityIcons name="clock" size={18} color="#55bfa9" />
            <Text style={tw`text-center font-bold opacity-60 text-[14px] `}>{workout?.duration} Minutes</Text>
          </View>
        </View>
        <SafeAreaView>
          <ScrollView style={tw`h-[60%]`}>
            {
              workout?.exercises.map((exercise: Exercise, index: number) => {
                return (
                  <TouchableOpacity 
                    key={index} 
                    onPress={() => navigation.navigate('Detail', { exercise })}
                  >
                    <ExcerciseCard
                      name={exercise.name}
                      count={exercise.duration}
                      reps={exercise.totalReps}
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
        <Header username={userDetails ? userDetails.data.user.username : 'username'}/>
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
        {valueGoal.length > 0 ? <GoalsCard selectedGoals={mapGoalsToImages(valueGoal)} /> : null}
        <View>
          {renderWorkoutExperience()}
        </View>
      </View>
      <View style={tw`absolute bottom-0 flex justify-center items-center w-full py-4`}>
        <Button 
          radius={'xl'}
          color="#55bfa9"
          disabled={!isTimeSelected || valueGoal === null}
          onPress={() => handleWorkout()}
        >
          Generate Workout
        </Button>
      </View>
    </View>
  );
}

export default Home;
