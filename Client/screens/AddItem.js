import { View, Text, SafeAreaView, TextInput } from "react-native";
import SelectList from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { useEffect, useState } from "react";
import axios from "axios";

import { Header } from "../components/Header";
import { Button, CircularButton } from "../components/Button";

import Arrow from "../assets/images/arrow.png";

const AddItem = ({ navigation }) => {
  const toast = useToast();
  const [selected, setSelected] = useState("");
  const [values, setValues] = useState({
    name: "",
    description: "",
    quantity: 0,
    userId: "",
  });
  let data = [
    { key: "1", value: "Brick" },
    { key: "2", value: "Stone" },
    { key: "3", value: "Cement" },
    { key: "4", value: "Bamboo" },
    { key: "5", value: "Wood" },
    { key: "6", value: "Sand" },
    { key: "7", value: "Clay" },
    { key: "9", value: "Metal" },
    { key: "10", value: "Other" },
  ];
  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getUserId = () => {
    AsyncStorage.getItem("userID").then((value) => {
      setValues({
        ...values,
        userId: value,
      });
    });
  };

  const handleSubmit = async () => {
    if (
      values.name !== "" &&
      values.description !== "" &&
      values.quantity !== 0 &&
      values.userId !== ""
    ) {
      await axios
        .post("https://finelineapi.herokuapp.com/api/purchase/addItem", values)
        .then(async (res) => {
          toast.show("Item Added Successfully", {
            type: "warning",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        });
    } else {
      toast.show("Please provide the necessary Items", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };
  useEffect(() => {
    getUserId();
  }, []);
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
          Add New Item
        </Text>
        <View style={{ padding: 8 }}>
          <View style={{ marginBottom: 12 }}>
            <Text>Item</Text>
            <SelectList
              placeholder="Select Item"
              setSelected={setSelected}
              data={data}
              onSelect={() => handleChange("name", data[selected - 1].value)}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text>Description</Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={values.description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Please Provide Description"
              style={{
                textAlign: "justify",
                justifyContent: "flex-start",
                padding: 10,
                paddingLeft: 20,
                borderWidth: 0.5,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text>Quantity</Text>
            <TextInput
              keyboardType="numeric"
              value={values.quantity}
              onChangeText={(number) => handleChange("quantity", number)}
              placeholder="Please Provide Quantity"
              style={{
                height: 40,
                textAlign: "justify",
                justifyContent: "flex-start",
                padding: 10,
                paddingLeft: 20,
                borderWidth: 0.5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
        <Button
          fontSize={12}
          text={"Add Item"}
          width={120}
          handlePress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddItem;
