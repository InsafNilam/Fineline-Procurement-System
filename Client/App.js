import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { ToastProvider } from "react-native-toast-notifications";
import { useFonts } from "expo-font";

import Login from "./screens/Login";
import TabNavigation from "./components/TabNavigation";
import ViewOrder from "./screens/ViewOrder";
import PurchaseOrder from "./screens/PurchaseOrder";
import AddItem from "./screens/AddItem";
import OrderDetails from "./screens/OrderDetails";

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <ToastProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BottomNav" component={TabNavigation} />
          <Stack.Screen name="ViewOrder" component={ViewOrder} />
          <Stack.Screen name="PurchaseOrder" component={PurchaseOrder} />
          <Stack.Screen name="AddItem" component={AddItem} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
