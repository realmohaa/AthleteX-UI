import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { View, Image, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import tw from 'twrnc';
import GoalsCard from '../components/goalsCard';
import altImg from '../assets/images/tracker.png';
import { ExerciseCategory, focusItems } from '../utils/data';
import { getData } from '../utils/util';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

function Tracker({ navigation }: { navigation: any }): React.ReactElement {

  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);

  const [openGoal, setOpenGoal] = useState(false);
  const [valueGoal, setValueGoal] = useState([]);

  const [openEquipment, setOpenEquipment] = useState(false);
  const [valueEquipment, setValueEquipment] = useState<string[]>([]);

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

  
  const fetchUser = async () => {
    const user = await getData('user');
    setUserDetails(user);
    return userDetails;
  }

  useEffect(() => {
    fetchUser()
  }, [valueTime]);

  const mapGoalsToImages = (goals: string[]) => {
    return goals.map(goal => {
      const matchingItem = ExerciseCategory.find(item => item.name === goal);
      return { name: goal, img: matchingItem ? matchingItem.img : null };
    });
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
        <View style={tw`w-full h-full flex flex-row items-start`}>
          <Image resizeMode='contain' source={altImg} style={tw`w-40 -mt-10`} />
          <ScrollView>
          <View style={tw`mt-10 mx-2 flex flex-col justify-center`}>
            {
                ExerciseCategory.map((item, index) => {
                  return (
                    <View key={index} style={tw`flex flex-row gap-2 border py-2 px-4 rounded-full items-center my-1`}>
                    <MaterialIcons name="sports-handball" size={30} color="black" />
                    <View>
                      <Text style={tw`font-bold`}>{item.name}</Text>
                      <Text>100%</Text>
                    </View>
                  </View>
                  )
                })
              }
          </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default Tracker;
