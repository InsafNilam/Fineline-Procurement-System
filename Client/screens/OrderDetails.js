import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

import { Header } from "../components/Header";
import { CircularButton } from "../components/Button";

import Arrow from "../assets/images/arrow.png";

const OrderDetails = ({ route, navigation }) => {
  const values = route.params;
  let count = 0;

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
            color: "#fff",
          }}
        >
          Order Details
        </Text>
        <ScrollView>
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
              {"Ref No: \n" + values._id}
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
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  Status
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.buyerName}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.supplierName}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.deliverAddress}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.siteName}
                </Text>
                <Text
                  style={{
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.phone}
                </Text>
                <Text
                  style={{
                    color: "#FCCB06",
                    fontFamily: "InterRegular",
                  }}
                >
                  {values.status}
                </Text>
              </View>
            </View>
            <Text style={{ marginTop: 12, textAlign: "center" }}>Items</Text>
            <View style={{ flex: 1 }}>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Name</DataTable.Title>
                  <DataTable.Title>Description</DataTable.Title>
                  <DataTable.Title numeric>Quantity</DataTable.Title>
                </DataTable.Header>
                {values.items
                  ? values.items.map((val) => (
                      <DataTable.Row key={"ITEM" + ++count}>
                        <DataTable.Cell>{val.name}</DataTable.Cell>
                        <DataTable.Cell>{val.description}</DataTable.Cell>
                        <DataTable.Cell numeric>{val.quantity}</DataTable.Cell>
                      </DataTable.Row>
                    ))
                  : null}
              </DataTable>
            </View>
            <Text
              style={{
                marginTop: 24,
                textAlign: "center",
                fontFamily: "InterSemiBold",
                fontSize: 18,
              }}
            >
              Amount: {values.total !== 0 ? values.total : "Not Yet Calculated"}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderDetails;
