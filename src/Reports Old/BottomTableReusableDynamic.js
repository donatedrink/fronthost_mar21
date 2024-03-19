import { Text, View } from "@react-pdf/renderer";
import React from "react";

const BottomTableReusableDynamic = (props) => {
  return (
    <View
      style={{
        width: props.width,
        fontSize: 8,
        fontFamily: "AmharicFont",
        borderColor: "black",
        borderStyle: "solid",
        borderBottomWidth: props.bottom,
      }}
    >
      <Text>{props.text}</Text>
    </View>
  );
};

export default BottomTableReusableDynamic;
