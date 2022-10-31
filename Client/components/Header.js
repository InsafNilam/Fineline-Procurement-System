import { View, Text, Image } from "react-native";

import Logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <View
      style={{
        marginTop: 40,
        marginBottom: 20,
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Image
        source={Logo}
        resizeMode="contain"
        style={{ width: 60, height: 60 }}
      />
      <Text
        style={{
          color: "#1C0C4F",
          fontFamily: "InterSemiBold",
          fontSize: 48,
          fontStyle: "italic",
        }}
      >
        Fineline
      </Text>
    </View>
  );
};

export default Header;
