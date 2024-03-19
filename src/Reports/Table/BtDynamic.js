import { Text, View } from "@react-pdf/renderer";
import React from "react";

function BtDynamic(props) {
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
}

export default BtDynamic;
