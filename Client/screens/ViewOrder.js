import { SafeAreaView, View, Text } from "react-native";

import { CircularButton } from "../components/Button";
import { Header } from "../components/Header";

import Arrow from "../assets/images/arrow.png";
const ViewOrder = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <CircularButton
        top={2}
        left={8}
        size={40}
        imgSize={50}
        imgUrl={Arrow}
        handlePress={() => navigation.goBack()}
      />
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
          Order List
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ViewOrder;
