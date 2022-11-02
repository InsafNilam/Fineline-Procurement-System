import { View, Text, Image } from "react-native";

import Logo from "../assets/images/logo.png";
import Background from "../assets/images/background.png";
import FocusedStatusBar from "./FocusedStatusBar";

export const Header = () => {
  return (
    <View
      style={{
        marginBottom: 20,
        width: "100%",
        height: 90,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <FocusedStatusBar backgroundColor={"#00539c"} />
      <Image
        source={Background}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: 90,
          width: "100%",
        }}
      />
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 80, height: 90 }}
      />
      <View style={{ paddingTop: 8, justifyContent: "center" }}>
        <Text
          style={{
            color: "#FCCB06",
            fontFamily: "InterBold",
            fontSize: 12,
            marginBottom: 5,
          }}
        >
          Procurement for Construction Industry
        </Text>
        <Text
          style={{
            color: "#1C0C4F",
            fontFamily: "InterSemiBold",
            fontSize: 20,
            alignSelf: "flex-end",
            fontStyle: "italic",
          }}
        >
          Fineline (PVT) Ltd
        </Text>
      </View>
    </View>
  );
};

export const LoginHeader = () => {
  return (
    <View
      style={{
        marginTop: 30,
        marginBottom: 20,
        width: "100%",
        height: 90,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <FocusedStatusBar />
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 80, height: 90 }}
      />
      <View style={{ paddingTop: 8, justifyContent: "center" }}>
        <Text
          style={{
            color: "#1C0C4F",
            fontFamily: "InterBold",
            fontSize: 12,
            marginBottom: 5,
          }}
        >
          Procurement for Construction Industry
        </Text>
        <Text
          style={{
            color: "#1C0C4F",
            fontFamily: "InterSemiBold",
            fontSize: 20,
            alignSelf: "flex-end",
            fontStyle: "italic",
          }}
        >
          Fineline (PVT) Ltd
        </Text>
      </View>
    </View>
  );
};
