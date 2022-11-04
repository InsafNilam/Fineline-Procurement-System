import { SafeAreaView, Text, View, ScrollView, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectList from "react-native-dropdown-select-list";
import { useToast } from "react-native-toast-notifications";
import { DataTable } from "react-native-paper";
import Icon from "react-native-dynamic-vector-icons";
import { useIsFocused } from "@react-navigation/native";

import { Button, CircularButton } from "../components/Button";
import { Header } from "../components/Header";
import Arrow from "../assets/images/arrow.png";

import { useEffect, useState } from "react";
import axios from "axios";

const PurchaseOrder = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [values, setValues] = useState({
    siteName: "",
    supplierName: "",
    buyerName: "",
    deliverAddress: "",
    phone: "",
    userID: "",
    items: [],
    deliverDate: date.toString(),
  });

  let siteData = [];
  let supplierData = [];

  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userID, setUserID] = useState("");
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const toast = useToast();
  const [site, setSite] = useState("");
  const [supplier, setSupplier] = useState("");
  const [siteValue, setSiteValue] = useState([]);
  const [itemDetails, setItemDetails] = useState([]);
  const [supplierDetails, setSupplierDetails] = useState([]);

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    setValues({
      ...values,
      deliverDate: date.toString(),
    });
    hideDatePicker();
  };

  const handleCheck = () => {
    if (itemDetails.length !== 0) {
      itemDetails.forEach((val) =>
        values.items.push({
          name: val.name,
          description: val.description,
          quantity: val.quantity,
        })
      );
      setValues({
        ...values,
        phone: userPhone,
        buyerName: userName,
        userID: userID,
      });
      setVisible(true);
    } else {
      toast.show("Order Cannot be Placed without items", {
        type: "warning",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    console.log(values);
  };

  const getSiteDetails = (value) => {
    let count = 1;
    if (!siteData.includes(value)) {
      siteData.push({ key: count, value: value });
      count++;
    }
  };

  const getSupplierDetails = (value) => {
    let count = 1;
    if (!supplierData.includes(value)) {
      supplierData.push({ key: count, value: value });
      count++;
    }
  };

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    if (
      values.buyerName !== "" &&
      values.deliverAddress !== "" &&
      values.deliverDate !== "" &&
      values.siteName !== "" &&
      values.supplierName !== "" &&
      values.phone !== "" &&
      values.items.length !== 0
    ) {
      axios
        .post("https://finelineapi.herokuapp.com/api/order/addOrder", values)
        .then((res) => {
          console.log(res);
          toast.show("Successfully Placed", {
            type: "success",
            placement: "top",
            duration: 1000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.goBack();
        })
        .catch((e) => console.log(e));
    } else {
      toast.show("Order not Placed", {
        type: "danger",
        placement: "top",
        duration: 1000,
        offset: 30,
        animationType: "slide-in",
      });
    }
    console.log(values);
  };
  useEffect(() => {
    async function fetchData() {
      await axios
        .get("https://finelineapi.herokuapp.com/api/site/getSite")
        .then((res) => {
          setSiteValue(res.data);
        })
        .catch((e) => console.log(e));
      await axios
        .get("https://finelineapi.herokuapp.com/api/supplier/getSupplier")
        .then((res) => {
          setSupplierDetails(res.data);
        })
        .catch((e) => console.log(e));
      await AsyncStorage.getItem("userName").then((val) => {
        setUserName(val);
      });
      await AsyncStorage.getItem("userPhone").then((val) => {
        setUserPhone("0" + String(val));
      });
      await AsyncStorage.getItem("userID").then(async (val) => {
        setUserID(val);
        await axios
          .get(
            `https://finelineapi.herokuapp.com/api/purchase/getItemByUserId/${val}`
          )
          .then((res) => {
            setItemDetails(res.data);
            toast.show("Successfully Fetched", {
              type: "success",
              placement: "top",
              duration: 1000,
              offset: 30,
              animationType: "slide-in",
            });
          })
          .catch((e) => console.log(e));
      });
    }
    fetchData();
  }, [isFocused]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      {siteValue.map((val) => getSiteDetails(val.name))}
      {supplierDetails.map((val) => getSupplierDetails(val.name))}
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
          Purchase Order
        </Text>
        <ScrollView>
          <View style={{ padding: 8 }}>
            <View style={{ marginBottom: 12 }}>
              <Text>Site</Text>
              <SelectList
                placeholder="Select Item"
                setSelected={setSite}
                data={siteData}
                onSelect={() =>
                  handleChange("siteName", siteData[site - 1].value)
                }
              />
            </View>
            <View>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Description</DataTable.Title>
                  <DataTable.Title numeric>Quantity</DataTable.Title>
                </DataTable.Header>
                {itemDetails
                  ? itemDetails
                      .filter((val) => val.userId == userID)
                      .map((val) => (
                        <DataTable.Row key={val._id}>
                          <DataTable.Cell>{val.name}</DataTable.Cell>
                          <DataTable.Cell>{val.description}</DataTable.Cell>
                          <DataTable.Cell numeric>
                            {val.quantity}{" "}
                            <Icon
                              name="trash"
                              type="FontAwesome5"
                              size={12}
                              onPress={() => {
                                let id = val._id;
                                axios
                                  .delete(
                                    `https://finelineapi.herokuapp.com/api/purchase/deleteItem/${val._id}`
                                  )
                                  .then((res) => {
                                    toast.show("Successfully Deleted", {
                                      type: "success",
                                      placement: "top",
                                      duration: 1000,
                                      offset: 30,
                                      animationType: "slide-in",
                                    });
                                    setItemDetails(
                                      itemDetails.filter(
                                        (val) => val._id !== id
                                      )
                                    );
                                  })
                                  .catch((e) => console.log(e));
                              }}
                            />
                          </DataTable.Cell>
                        </DataTable.Row>
                      ))
                  : null}
              </DataTable>
            </View>
            <Button
              width={80}
              fontSize={12}
              text={"ADD"}
              handlePress={() => navigation.navigate("AddItem")}
            />
            <View style={{ marginBottom: 12 }}>
              <Text>Supplier</Text>
              <SelectList
                placeholder="Select Item"
                setSelected={setSupplier}
                data={supplierData}
                onSelect={() =>
                  handleChange("supplierName", supplierData[supplier - 1].value)
                }
              />
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text>Buyer Name</Text>
              <TextInput
                value={userName}
                editable={false}
                onChangeText={() => {}}
                placeholder="Enter UserName"
                style={{
                  height: 40,
                  padding: 10,
                  paddingLeft: 35,
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
              />
            </View>
            <View style={{ marginBottom: 12 }}>
              <Text>Delivery Address</Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={values.deliverAddress}
                onChangeText={(text) => {
                  handleChange("deliverAddress", text);
                }}
                placeholder="Enter Delivery Address"
                style={{
                  padding: 10,
                  paddingLeft: 35,
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>Required Date</Text>
              <DateTimePickerModal
                isVisible={show}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              <Icon
                size={24}
                name="calendar-alt"
                type="FontAwesome5"
                onPress={() => setShow(!show)}
              />
            </View>
            <Text
              style={{
                marginBottom: 12,
                textAlign: "center",
                fontSize: 15,
                fontFamily: "InterRegular",
              }}
            >
              {String(date.toUTCString())}
            </Text>
            <View style={{ marginBottom: 12 }}>
              <Text>Contact Details</Text>
              <TextInput
                value={userPhone}
                editable={false}
                onChangeText={() => {}}
                placeholder="Enter User Phone"
                style={{
                  height: 40,
                  padding: 10,
                  paddingLeft: 35,
                  borderWidth: 0.5,
                  borderRadius: 10,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                width={100}
                fontSize={12}
                text={"Check"}
                handlePress={handleCheck}
              />
              {visible && (
                <Button
                  width={100}
                  fontSize={12}
                  text={"Proceed"}
                  backgroundColor={"#00ff7f"}
                  handlePress={handleSubmit}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PurchaseOrder;
