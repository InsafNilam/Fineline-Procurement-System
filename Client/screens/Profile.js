import { SafeAreaView, View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Header } from "../components/Header";
import { CircularButton } from "../components/Button";
import ProfileData from "../components/ProfileData";

import User from "../assets/user.png";
import Exit from "../assets/images/exit.png";

const Profile = ({ navigation }) => {
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDate, setUserDate] = useState("");

  const getDetails = () => {
    AsyncStorage.getItem("userRole").then((val) => {
      setUserRole(val);
    });
    AsyncStorage.getItem("userName").then((val) => {
      setUserName(val);
    });
    AsyncStorage.getItem("userEmail").then((val) => {
      setUserEmail(val);
    });
    AsyncStorage.getItem("userPhone").then((val) => {
      setUserPhone(val);
    });
    AsyncStorage.getItem("userID").then((val) => {
      setUserID(val);
    });
    AsyncStorage.getItem("userDate").then((val) => {
      setUserDate(val);
    });
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1, backgroundColor: "#F0F8FF" }}>
        <Text
          style={{
            fontFamily: "InterRegular",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            textAlign: "center",
            fontSize: 30,
            backgroundColor: "black",
            marginBottom: 20,
            color: "#fff",
          }}
        >
          User Profile
        </Text>
        <View>
          <CircularButton
            right={5}
            top={-15}
            imgUrl={Exit}
            size={40}
            imgSize={25}
            handlePress={() => {
              AsyncStorage.clear();
              navigation.navigate("Login");
            }}
          />
        </View>
        <View
          style={{
            width: 140,
            height: 140,
            backgroundColor: "gray",
            borderRadius: 70,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderColor: "#17B169",
            borderWidth: 2,
            marginBottom: 12,
          }}
        >
          <Image
            source={User}
            resizeMode="contain"
            style={{ height: 100, width: 80 }}
          />
        </View>
        <Text
          style={{
            fontFamily: "InterBold",
            textAlign: "center",
            fontSize: 24,
          }}
        >
          {userName}
        </Text>
        <View style={{ padding: 8 }}>
          <ProfileData
            subText={userID}
            mainText={"User ID"}
            icon={"id-badge"}
          />
          <ProfileData
            subText={userRole.toUpperCase()}
            mainText={"Role"}
            icon={"user"}
          />
          <ProfileData
            subText={userEmail}
            mainText={"Email"}
            icon={"envelope"}
          />
          <ProfileData
            subText={"0" + String(userPhone)}
            mainText={"Phone"}
            icon={"phone-square-alt"}
          />
          <ProfileData
            subText={userDate}
            mainText={"Date Joined"}
            icon={"calendar-alt"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
