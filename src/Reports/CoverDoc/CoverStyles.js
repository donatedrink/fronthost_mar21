import { StyleSheet } from '@react-pdf/renderer';

const CoverStyles = StyleSheet.create({
  fullfreebox: {
    display:'flex',
    justifyContent: 'flex-start',
    borderWidth: 1,
    fontSize: 11,
    borderColor: 'black',
    borderStyle: 'solid',
    height: 50
  },
  fullbox: {
    justifyContent: 'center',
    borderWidth: 1,
    fontSize: 11,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  noupperbox: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  space: {
    paddingTop: 5,
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'AmharicFont',
  },
  boldText: {
    marginTop: 1,
    fontSize: 9,
    fontFamily: 'AmharicFont',
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'AmharicFont',
    textDecoration: 'underline',
  },
  subtitle: {
    fontSize: 15,
    margin: 11,
    fontFamily: 'AmharicFont',
  },
  text: {
    marginTop: 1,
    fontSize: 9,
    fontFamily: 'AmharicFont',
    fontWeight: 'bold',
  },
  textCenter: {
    marginTop: 1,
    fontSize: 9,
    textAlign: 'center',
    fontFamily: 'AmharicFont',
    fontWeight: 'bold',
  },
  boldtext: {
    marginTop: 1,
    fontSize: 10,
    textAlign: 'justify',
    fontFamily: 'AmharicFont',
  },
  ReporIimage: {
    marginTop: -10,
    height: 60,
    width: '100%',
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 11,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

  fullContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 11,
    fontFamily: 'AmharicFont',
  },
  numberContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '5%',
    padding: 2,
  },
  halfPageWidthContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '47.5%',
    paddingLeft: 2,
  },
  keyContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '60%',
    paddingLeft: 2,
  },
  valueContainer: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: 'black',
    borderStyle: 'solid',
    width: '35%',
    paddingLeft: 2,
  },
});


export default CoverStyles