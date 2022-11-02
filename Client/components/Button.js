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

export const CircularButton = ({
  size,
  imgSize,
  imgUrl,
  handlePress,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        width: size,
        height: size,
        backgroundColor: "gray",
        borderRadius: size / 2,
        alignItems: "center",
        justifyContent: "center",
        ...props,
      }}
      onPress={handlePress}
    >
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{ width: imgSize, height: imgSize }}
      />
    </TouchableOpacity>
  );
};
