import { TouchableOpacity, Image } from "react-native";
import { Text } from "react-native";

export const Button = ({ width, fontSize, handlePress, text, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#1C0C4F",
        borderRadius: 20,
        width: width,
        padding: 12,
        ...props,
      }}
      onPress={handlePress}
    >
      <Text
        style={{
          fontFamily: "InterSemiBold",
          fontSize: fontSize,
          color: "#fff",
          textAlign: "center",
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export const CircularButton = ({ imgUrl, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        position: "absolute",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </TouchableOpacity>
  );
};
