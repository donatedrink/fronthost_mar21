import React from 'react';
import { Text, Font, View, Image, StyleSheet } from '@react-pdf/renderer';
import AmigosLogo from '../Images/new.PNG';
import AmharicFont from "../font/ebrima.ttf"

const styles = StyleSheet.create({
  container: {
    marginTop: -15,
    display:'flex',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#FF7700',
    borderBottomStyle: 'solid',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  ReporIimage: {
    height: 45,
    width: '60%',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontFamily: 'AmharicFont',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'AmharicFont',
  },
  link: {
    fontFamily: 'AmharicFont',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'center',
    justifySelf: 'center',
  },
});

Font.register({
  family: 'AmharicFont',
  src: AmharicFont,
});

function RequestFormHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.detailColumn}>
        <Image style={styles.ReporIimage} src={AmigosLogo} />
      </View>
      <View style={styles.linkColumn}>
        <Text style={styles.name}> በተወሰነ ጊዜ የሚከፈል </Text>
        <Text style={styles.name}> የብድር ውል ስምምነት </Text>
      </View>
    </View>
  );
}

export default RequestFormHeader