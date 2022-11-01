import { useCallback, useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-dynamic-vector-icons";

import Header from "../components/Header";
import { Button } from "../components/Button";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Login = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (values.email !== "" && values.password !== "") {
      await axios
        .post("https://finelineapi.herokuapp.com/api/user/login", values)
        .then((res) => {
          let userToken = res.data.token;
          let userName = res.data.name;
          let userRole = res.data.role;
          let userEmail = res.data.email;

          if (userToken !== null) {
            AsyncStorage.setItem("userToken", userToken);
            AsyncStorage.setItem("userName", userName);
            AsyncStorage.setItem("userRole", userRole);
            AsyncStorage.setItem("userEmail", userEmail);

            toast.show("Login Successful", {
              type: "success",
              placement: "top",
              duration: 1000,
              offset: 30,
              animationType: "slide-in",
            });

            setTimeout(() => {
              navigation.navigate("Home");
            }, 1000);
          }
        })
        .catch((e) => {
          console.log("Error:", e.message);
          toast.show("Invalid credentials", {
            type: "danger",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    } else {
      toast.show("Enter username and password", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };

  if (!appIsReady) {
    return null;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 40, backgroundColor: "#72A0C1" }}
      onLayout={onLayoutRootView}
    >
      <Header />
      <View
        style={{
          borderTopLeftRadius: 60,
          marginTop: 50,
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 2,
            padding: 12,
            borderTopLeftRadius: 60,
            backgroundColor: "#ACE1AF",
          }}
        >
          <Text
            style={{ marginTop: 12, fontFamily: "InterRegular", fontSize: 24 }}
          >
            Welcome, User
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontFamily: "InterLight",
              fontSize: 12,
              fontStyle: "italic",
            }}
          >
            It's Lovely to have you among us
          </Text>
        </View>
        <View style={{ flex: 1, marginTop: 60 }}>
          <Text
            style={{
              marginTop: 12,
              textAlign: "center",
              fontFamily: "InterLight",
              fontSize: 36,
            }}
          >
            LOG IN
          </Text>
          <View>
            <Icon
              name="user"
              type="AntDesign"
              size={20}
              color="black"
              style={{
                position: "absolute",
                top: 22,
                left: 20,
                borderRightWidth: 1,
              }}
            />
            <TextInput
              value={values.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="Enter Email"
              style={{
                height: 40,
                margin: 12,
                padding: 10,
                paddingLeft: 35,
                borderWidth: 1,
                borderRadius: 20,
              }}
            />
          </View>
          <View>
            <Icon
              name="lock"
              type="AntDesign"
              size={20}
              color="black"
              style={{
                position: "absolute",
                top: 22,
                left: 20,
                borderRightWidth: 1,
              }}
            />
            <TextInput
              value={values.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry={true}
              placeholder="Enter Password"
              style={{
                height: 40,
                margin: 12,
                padding: 10,
                paddingLeft: 35,
                borderWidth: 1,
                borderRadius: 20,
              }}
            />
          </View>
          <Button
            fontSize={12}
            width={100}
            text={"Login"}
            handlePress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
