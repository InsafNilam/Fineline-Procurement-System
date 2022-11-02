import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import { Header } from "../components/Header";

const Requisition = () => {
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
          Requisition
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Requisition;
