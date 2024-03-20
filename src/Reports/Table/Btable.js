import React from "react";
import { Text, View } from "@react-pdf/renderer";

function Btable(props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 9,
        fontFamily: "AmharicFont",
        backgroundColor: props.bgcolor,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderColor: "black",
          borderStyle: "solid",
          width: "5%",
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        <Text>{props.zid}</Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderColor: "black",
          borderStyle: "solid",
          width: "60%",
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        <Text style={{ textAlign: props.textalign }}>{props.zkey}</Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderTopWidth: 0,
          borderColor: "black",
          borderStyle: "solid",
          width: "35%",
          paddingLeft: 2,
          paddingBottom: 1,
        }}
      >
        <Text>{props.zvalue}</Text>
      </View>
    </View>
  );
}

export default Btable;
