import React from 'react';
import { Text, View } from '@react-pdf/renderer';
import ReportStyles from './ReportStyles';

function BottomTableReusable(props) {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', fontSize: 11, fontFamily: 'AmharicFont', backgroundColor: props.bgcolor }}>
      <View style={ReportStyles.numberContainer}>
        <Text>{props.zid}</Text>
      </View>
      <View style={ReportStyles.keyContainer}>
        <Text style={{ textAlign: props.textalign }}>{props.zkey}</Text>
      </View>
      <View style={ReportStyles.valueContainer}>
        <Text>{props.zvalue}</Text>
      </View>
    </View>
  );
}

export default BottomTableReusable;
