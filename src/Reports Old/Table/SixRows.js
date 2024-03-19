import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

function SixRows(props) {
  const Styles = StyleSheet.create({
    trbl: {},
    rbl: {
      display: "flex",
      flexDirection: "row",
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth: 1,
    },
    bl: {
      display: "flex",
      flexDirection: "row",
      borderBottomWidth: 1,
      borderLeftWidth: 1,
    },
    b: {
      display: "flex",
      flexDirection: "row",
      borderBottomWidth: 1,
    },
  });

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        fontSize: 8,
        fontFamily: "AmharicFont",
        backgroundColor: props.bgcolor,
      }}
    >
      <View style={{ ...Styles.bl, width: "34%" }}>
        <Text>{props.key1 + ":"}</Text>
        <View style={{ paddingLeft: 5}}>
          <Text>{props.val1}</Text>
        </View>
      </View>
      <View style={{ ...Styles.bl, width: "17%" }}>
        <Text>{props.key2}</Text>
      </View>
      <View style={{ ...Styles.bl, width: "17%" }}>
        <Text>{props.val2}</Text>
      </View>
      <View style={{ ...Styles.bl, width: "16%" }}>
        <Text>{props.key3}</Text>
      </View>
      <View style={{ ...Styles.rbl, width: "16%" }}>
        <Text>{props.val3}</Text>
      </View>
    </View>
  );
}

export default SixRows;
