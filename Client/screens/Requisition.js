import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import axios from "axios";

import { Header } from "../components/Header";

const Requisition = () => {
  const isFocused = useIsFocused();
  let count = 0;
  let refCount = 0;
  const [values, setValues] = useState([]);

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
            marginBottom: 20,
            color: "#fff",
          }}
        >
          Requisition
        </Text>
        <View style={{ flex: 1 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Ref No</DataTable.Title>
              <DataTable.Title>Site Name</DataTable.Title>
              <DataTable.Title numeric>staffID</DataTable.Title>
            </DataTable.Header>
            {values
              ? values
                  .filter((val) => val.status.toLowerCase() === "approved")
                  .map((val) => (
                    <DataTable.Row key={"RS" + ++count}>
                      <DataTable.Cell>{"RS00" + ++refCount}</DataTable.Cell>
                      <DataTable.Cell>{val.siteName}</DataTable.Cell>
                      <DataTable.Cell>{val.staffID}</DataTable.Cell>
                    </DataTable.Row>
                  ))
              : null}
          </DataTable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Requisition;
