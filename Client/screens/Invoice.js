import { SafeAreaView, View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

import { Header } from "../components/Header";
import { Button } from "../components/Button";

const Invoice = ({ navigation }) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const [values, setValues] = useState([]);

  const handleDelete = (id) => {
    axios
      .delete(`https://finelineapi.herokuapp.com/api/order/deleteOrder/${id}`)
      .then((res) => {
        toast.show("Successfully Deleted", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "slide-in",
        });
        setValues(values.filter((val) => val._id !== id));
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = (id) => {
    axios
      .put(
        `https://finelineapi.herokuapp.com/api/order/updatePaidOrder/${id}`,
        { paidStatus: "Approved" }
      )
      .then((res) => {
        toast.show("Successfully Updated", {
          type: "success",
          placement: "top",
          duration: 1000,
          offset: 30,
          animationType: "slide-in",
        });
        setValues(values.filter((val) => val._id !== id));
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    AsyncStorage.getItem("userID").then((value) => {
      axios
        .get(`https://finelineapi.herokuapp.com/api/order/getOrder/${value}`)
        .then((res) => {
          setValues(res.data);
        });
    });
  }, [isFocused]);
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
            color: "#fff",
          }}
        >
          Invoice
        </Text>
        <View style={{ paddingBottom: 40 }}>
          <FlatList
            data={values}
            renderItem={({ item }) =>
              item.status.toLowerCase() === "approved" &&
              item.paidStatus.toLowerCase() === "pending" && (
                <View
                  style={{
                    margin: 8,
                    padding: 8,
                    backgroundColor: "#72A0C1",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "InterSemiBold",
                      fontSize: 18,
                      color: "#EDF7F6",
                    }}
                  >
                    {"Ref No: \n" + item._id}
                  </Text>
                  <View
                    style={{
                      marginTop: 24,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        Buyer Name
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        Supplier Name
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        Delivery Address
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        Site Name
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        Phone Number
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        {item.buyerName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        {item.supplierName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        {item.deliverAddress}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        {item.siteName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                        }}
                      >
                        0112344338
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      marginTop: 24,
                      textAlign: "center",
                      fontFamily: "InterSemiBold",
                      fontSize: 18,
                    }}
                  >
                    Amount:{" "}
                    {item.total !== 0 ? item.total : "Not Yet Calculated"}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      backgroundColor={"#CF0A0A"}
                      fontSize={12}
                      handlePress={() => handleDelete(item._id)}
                      text={"Regect"}
                      width={100}
                    />
                    <Button
                      backgroundColor={"#54B435"}
                      fontSize={12}
                      handlePress={() => handleUpdate(item._id)}
                      text={"Accept"}
                      width={100}
                    />
                  </View>
                </View>
              )
            }
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Invoice;
