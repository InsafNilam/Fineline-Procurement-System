import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-dynamic-vector-icons";

import Home from "../screens/Home";
import Order from "../screens/Order";
import Requisition from "../screens/Requisition";
import Invoice from "../screens/Invoice";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="home"
              type="AntDesign"
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={Order}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="shopping-cart"
              type="FontAwesome5"
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Requisition"
        component={Requisition}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="clipboard-list"
              type="FontAwesome5"
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Invoice"
        component={Invoice}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="envelope-open-text"
              type="FontAwesome5"
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name="user"
              type="AntDesign"
              color={focused ? color : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
