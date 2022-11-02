import { View, Text } from "react-native";
import Icon from "react-native-dynamic-vector-icons";

const ProfileData = ({ mainText, subText, icon, size }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "gray",
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 5,
        }}
      >
        <Icon name={icon} type="FontAwesome5" size={24} color="black" />
      </View>
      <View
        style={{
          backgroundColor: "gray",
          flex: 1,
          height: 40,
          borderRadius: 20,
          padding: 5,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontFamily: "InterRegular",
            fontSize: 18,
          }}
        >
          {mainText}:{" "}
          <Text
            style={{
              textAlign: "left",
              fontFamily: "InterLight",
              fontSize: 14,
            }}
          >
            {subText}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ProfileData;
