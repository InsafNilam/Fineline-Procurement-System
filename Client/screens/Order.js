import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header } from "../components/Header";

import ViewOrder from "../assets/images/viewOrder.png";
import PurchaseOrder from "../assets/images/makeOrder.png";

const DATA = [
  {
    id: "O001",
    title: "Make Purchase Order",
    image: PurchaseOrder,
    routeName: "PurchaseOrder",
  },
  {
    id: "O002",
    title: "View Order",
    image: ViewOrder,
    routeName: "ViewOrder",
  },
];

const Order = ({ navigation }) => {
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
          Order
        </Text>
        <View
          style={{
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            flex: 1,
            paddingTop: 10,
            paddingBottom: 10,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 200,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 8,
                }}
                onPress={() => navigation.navigate(item.routeName)}
              >
                <Image
                  source={item.image}
                  resizeMode="contain"
                  style={{ height: "80%", width: "80%", marginBottom: 5 }}
                />
                <Text style={{ fontFamily: "InterMedium", fontSize: 18 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Order;
