import React, { useState, useContext } from "react";
import { Text, View, Image } from "react-native";
import Modal from "react-native-modal";
import tw from "twrnc";
import ApiClient from "../../utils/api_client";
import { EXISTING_WORKOUT, LOGIN_ENDPOINT } from "../../utils/consts";
import { Button } from "react-native-paper";
// Logo Imports
import logo from "../../assets/images/logo.png";
import wlogo from "../../assets/images/logowhite.png";
import { storeData, AuthContext } from "../../utils/util";
import CustomInput from "../../components/customInput";
import Toast from "react-native-toast-message";

function Login({ navigation }: { navigation: any }): React.JSX.Element {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

const handleLogin = async (navigation: any) => {
  setIsLoading(true);

  try {
    const response = await ApiClient.getInstance().post(LOGIN_ENDPOINT, {
      username,
      password,
    });
    await storeData(response.data, "user");

    const accessToken = response.data.data.user.tokens.accessToken;
    const authHeaders = { Authorization: `Bearer ${accessToken}` };

    try {
      const workoutResponse = await ApiClient.getInstance().get(
        EXISTING_WORKOUT,
        { headers: authHeaders }
      );
      await storeData(workoutResponse.data.data, "user-workout");
    } catch (e) {
      handleWorkoutFetchError();
    }

    setModalVisible(false);
    setIsSignedIn(true);
    if (isSignedIn) {
      navigation.reset({
        routes: [{ name: "Protected" as never }],
      });
    }
  } catch (e: any) {
    handleLoginError(e);
  } finally {
    setIsLoading(false);
  }
};

const handleWorkoutFetchError = () => {
  Toast.show({ type: "error", text1: "No Existing Workout Found" });
};

const handleLoginError = (error: any) => {
  if (error.response && error.response.status === 404) {
    Toast.show({
      type: "error",
      text1: "The requested resource could not be found",
    });
  } else {
    Toast.show({
      type: "error",
      text1: "The username or password is incorrect",
      text2: "Please try again with the correct credentials",
    });
  }
};


  return (
    <View
      style={tw`flex flex-col items-center justify-center h-full w-full px-8`}
    >
      <Modal
        avoidKeyboard
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <View
          style={tw`p-6 w-full max-w-sm flex items-center bg-[#55bfa9] rounded-3xl`}
        >
          <View style={tw`flex flex-row items-center justify-center mb-4`}>
            <Text style={tw`text-2xl text-[#3c403d]`}>Athlete</Text>
            <Image source={wlogo} style={tw`w-[75px] h-[75px]`} />
          </View>
          <View style={tw`flex flex-col gap-4 w-full`}>
            <CustomInput
              placeholder="Username / Email"
              name={username}
              setName={setUsername}
              icon="account"
            />
            <CustomInput
              placeholder="Password"
              name={password}
              setName={setPassword}
              isSecured
              icon="form-textbox-password"
            />
          </View>
          <Button
            onPress={() => handleLogin(navigation)}
            loading={isloading}
            mode="contained"
            buttonColor="white"
            textColor="#55bfa9"
            style={tw`mt-4`}
            disabled={username === "" && password === "" ? true : false}
          >
            Login
          </Button>
        </View>
        <Toast />
      </Modal>
      <Image source={logo} style={{ width: 250, height: 250 }} />
      <Button
        onPress={() => toggleModal()}
        loading={isloading}
        mode="contained"
        buttonColor="#55bfa9"
        textColor="white"
      >
        Login
      </Button>

      <Button
        mode="text"
        style={tw`my-2`}
        textColor="black"
        onPress={() => navigation.navigate("Register")}
      >
        Don't Have an account?
      </Button>
      <Text style={tw`absolute bottom-4 text-xs`}>Myathletex.com</Text>
    </View>
  );
}

export default Login;
