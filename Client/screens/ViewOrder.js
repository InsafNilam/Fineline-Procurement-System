import { SafeAreaView, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";

import { Button, CircularButton } from "../components/Button";
import { Header } from "../components/Header";

import Arrow from "../assets/images/arrow.png";

const ViewOrder = ({ navigation }) => {
  const toast = useToast();
  const [values, setValues] = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userID").then((value) => {
      axios
        .get(`https://finelineapi.herokuapp.com/api/order/getOrder/${value}`)
        .then((res) => {
          setValues(res.data);
          toast.show("Successfully Fetched", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
        });
    });
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
            marginBottom: 10,
            color: "#fff",
          }}
        >
          Order List
        </Text>
        <View
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <FlatList
            data={values}
            renderItem={({ item }) =>
              item.paidStatus.toLowerCase() === "pending" && (
                <View
                  style={{
                    height: 190,
                    borderRadius: 10,
                    backgroundColor: "#72A0C1",
                    flex: 1,
                    margin: 8,
                  }}
                >
                  <View style={{ padding: 8 }}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontFamily: "InterMedium",
                        fontSize: 15,
                        color: "#EDF7F6",
                        marginBottom: 15,
                      }}
                    >
                      {"ID: " + item._id}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "InterMedium",
                            fontSize: 15,
                          }}
                        >
                          Delivery Date
                        </Text>
                        <Text
                          style={{
                            fontFamily: "InterMedium",
                            fontSize: 15,
                          }}
                        >
                          Site Name
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontFamily: "InterMedium",
                            fontSize: 15,
                          }}
                        >
                          Status
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            alignItems: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "InterRegular",
                              fontSize: 15,
                              color: "#FCCB06",
                            }}
                          >
                            {item.deliverDate.split(" ")[2] +
                              " " +
                              item.deliverDate.split(" ")[1] +
                              " " +
                              item.deliverDate.split(" ")[3] +
                              " " +
                              item.deliverDate.split(" ")[0]}
                          </Text>
                          <Text
                            style={{
                              fontFamily: "InterRegular",
                              fontSize: 15,
                              color: "#FCCB06",
                            }}
                          >
                            {item.siteName}
                          </Text>
                          <Text
                            style={{
                              textAlign: "center",
                              fontFamily: "InterRegular",
                              fontSize: 15,
                              color: "#FCCB06",
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <Button
                    fontSize={12}
                    handlePress={() =>
                      navigation.navigate("OrderDetails", item)
                    }
                    text={"View"}
                    width={100}
                  />
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

export default ViewOrder;
