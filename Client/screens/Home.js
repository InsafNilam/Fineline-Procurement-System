import { SafeAreaView, View, Text, Image, Alert } from "react-native";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  const [text, setText] = useState("");
  const hasUnsavedChanges = Boolean(true);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          "Discard changes?",
          "You have unsaved changes. Are you sure to discard them and leave the screen?",
          [
            { text: "Don't leave", style: "cancel", onPress: () => {} },
            {
              text: "Discard",
              style: "destructive",
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      }),
    [navigation, hasUnsavedChanges]
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          flex: 1,
          padding: 8,
          justifyContent: "space-evenly",
          alignContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "InterRegular",
              fontSize: 30,
              alignSelf: "center",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Welcome to FineLine
          </Text>
          <Text
            style={{
              fontFamily: "InterMedium",
              fontSize: 22,
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            We are glad and grateful you're here.
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "InterLight",
            fontSize: 18,
            alignSelf: "center",
            textAlign: "justify",
          }}
        >
          Fineline exists to provide a trust construction development ecosystem
          for online Site Managers. We are honoured to help folks at all stages
          of their journey make progress toward new level of success. Whether
          you are an aspiring worker or an accomplished one. We are here for you
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
