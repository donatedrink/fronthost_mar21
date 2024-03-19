import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Document,
  Font,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import Header from "./Header";
import EtCurrency from "../../common/modules/currency";

import AmharicFont from "./font/ebrima.ttf";
import ReportStyles from "./ReportStyles";
import BottomTableReusableDynamic from "./BottomTableReusableDynamic";
import { useParams } from "react-router-dom";
import axios from "axios";
import SixRows from "./Table/SixRows";

const Styles = StyleSheet.create({
  text: {
    marginTop: 1,
    fontSize: 12,
    textAlign: "center",
    fontFamily: "AmharicFont",
    fontWeight: "bold",
    color: "red",
  },
});

Font.register({
  family: "AmharicFont",
  src: AmharicFont,
});

function DocCover() {
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getCustomer();
    getLoan();
  }, []);

  const getCustomer = () => {
    axios
      .get(`${serverIP}customer/customer/${customerId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoan = () => {
    axios
      .get(`${serverIP}loan/loans/${loanId}`)
      .then((res) => {
        console.log(res.data);
        setLoan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <PDFViewer style={{ width: "100%", height: 700 }}>
      <Document title="Loan Cover">
        <Page style={ReportStyles.body} wrap>
          <Header />
          {Object.keys(loan).length > 0 ? (
            <>
              <Text style={ReportStyles.space}></Text>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.text}>
                  ጥያቄው የቀረበበት ፕሮጀክት ቁጥር {loan.loanId}
                </Text>
              </View>

              <SixRows
                key1="የአመልካች ስም ከነ አያት"
                val1="ዮሴፍ በሪሁን አበራ"
                key2="የግል ብድር"
                val2=""
                key3="የአባል የብድር መ.ቁጥር"
                val3=""
              />
              <SixRows key1="ክ/ከተማ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ወረዳ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="የቤት ቁጥር" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ስልክ ቁጥር" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="የመታወቅያ ቁጥር" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="የጋብቻ ሁኔታ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="የማህበሩ አባል የሆኑበት ጊዜ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="አንድ አባል ባስገባ ተጨማሪ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="በትክክል ቁጠባ የተቆጠበበት ወራት" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ቁጠባ ያልተቆጠበበት ወራት" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ያላቸው ቁጠባና አክስዮን" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ብድር የሚወሰድበት የብዜት መጠን" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="የተጠየቀው የብድር መጠን" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="አጠቃላይ ወርሀዊ ገቢ የአልና የሚስት" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ከድርጅቱ የሚገኝ የዋስትና ጥቅም" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ማስያዝ የሚጠበቅባቸው የዋስትና መጠን" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="አጠቃላይ ወርሀዊ ገቢ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="ወርሀዊ መደበኛ ቁጠባ" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="" val1="" key2="" val2="" key3="" val3="" />
              <SixRows key1="" val1="" key2="" val2="" key3="" val3="" />
            </>
          ) : (
            <></>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default DocCover;
