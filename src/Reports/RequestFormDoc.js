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
import RequestFormHeader from "./RequestFormDoc/RequestFormHeader";
import EtCurrency from "../Common/modules/currency";

import AmharicFont from "./font/ebrima.ttf";
import RequestFormStyles from "./RequestFormDoc/RequestFormStyles";
import Btable from "./Table/Btable";
// import BottomTableReusableSameWidth from './BottomTableReusableSameWidth';

import { useParams } from "react-router-dom";
import axios from "axios";

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

const Subtitle = ({ children, ...props }) => (
  <Text style={RequestFormStyles.subtitle} {...props}>
    {children}
  </Text>
);

function RequestFormDoc() {
  const { customerId, loanId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    
    getCustomer();
    getLoan();
  }, []);

  const getCustomer = () => {
    axios
      .get(`${serverIP}customer/customers/${customerId}`)
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
    <PDFViewer style={{ width: "100%", height: 1300 }}>
      <Document title="Loan Agreement">
        <Page style={RequestFormStyles.body} wrap>
          <RequestFormHeader />
          {Object.keys(loan).length > 0 ? (
            <>
              <Text style={RequestFormStyles.space}></Text>
              {/* <Text style={RequestFormStyles.author}> የብድር መጠየቅያ ቅጽ </Text> */}
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.text}>
                  ጥያቄው የቀረበበት ፕሮጀክት ቁጥር {loan.loanId}
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.text}> </Text>
              </View>

              <Btable
                zid="1"
                zkey="ሙሉ ስም"
                zvalue={customer.amDisplayName}
              />
              <Btable
                zid="2"
                zkey="መለያ ቁጥር"
                zvalue={customer.entityExternalId}
              />
              <Btable
                zid="3"
                zkey="አድራሻ/ስልክ"
                zvalue={customer.amAddress + "/" + customer.mobileNo}
              />
              <Btable zid="4" zkey="ፆታ" zvalue={customer.gender} />
              <Btable
                zid="5"
                zkey="አባል የሆኑበት ቀን (DD/MM/YY)"
                zvalue={customer.memberSince}
              />
              <Btable
                zid="6"
                zkey="ጥያቄው የቀረበበት ቀን (DD/MM/YY) በሃበሻ እና በፈረንጅ"
                zvalue={loan.submittedOnDate}
              />
              <Btable
                zid="7"
                zkey="የብድር አይነት"
                zvalue={loan.loantype}
              />
              <Btable zid="8" zkey="የዋስትና አይነት" />
              {/* <BottomTableReusable
              zid="9"
              zkey="ያላቸው የቁጠባ መጠን"
              zvalue={loan.totalSaving.toLocaleString(
                "am-ET",
                EtCurrency
              )}
            /> */}
              {/* <BottomTableReusable
              zid="10"
              zkey="ያላቸው የአክስዮን መጠን"
              zvalue={loan.totalShares.toLocaleString(
                "am-ET",
                EtCurrency
              )}
            /> */}
              <Btable
                zid="11"
                zkey="አሁን ያላቸው የቁጠባ መጠን/መደበኛ + አክስዮን/"
                zvalue={Number(
                  Number(loan.totalSaving) + Number(loan.totalShares)
                ).toLocaleString("am-ET", EtCurrency)}
              />
              <Btable
                zid="12"
                zkey="ብድሩ የሚወሰድበት የብዜት መጠን"
                zvalue={loan.multiplier}
              />
              <Btable
                zid="13"
                zkey="የሚደርሰው ብድር መጠን"
                bgcolor="orange"
                textalign="center"
                zvalue={Number(
                  loan.approvedPrincipalDisbursed.toFixed(2)
                ).toLocaleString("am-ET", EtCurrency)}
              />
              <Btable
                zid="14"
                zkey="የአግልግሎት ክፍያ መጠን %"
                zvalue={loan.prcntServiceCharge + " %"}
              />
              <Btable
                zid="15"
                zkey="የብድር ዋስትና (ኢንሹራንስ)"
                zvalue={loan.prcntLifeInsurance + " %"}
              />
              <Btable zid="16" zkey="የአግልግሎት ክፍያ + የብድር ዋስትና ብር" />
              <Btable
                zid="17"
                zkey="ብደሩን የሚወስዱበት የወለድ መጠን (%)"
                zvalue={loan.annualInterestRate + " %"}
              />
              <Btable
                zid="18"
                zkey="ብድሩ የሚመለስበት አመት"
                zvalue={loan.numberOfRepayments / 12 + " ኣመት"}
              />
              <Btable
                zid="19"
                zkey="ወርሃዊ ክፍያ"
                zvalue={loan.totalDueForPeriod}
              />
              <Btable
                zid="20"
                zkey="ጠቅላላ የወለድ ክፍያ"
                zvalue={loan.totalInterestPayment}
              />
              <Btable
                zid="21"
                zkey="የወረፋ ጊዜ"
                zvalue={loan.queueTime}
              />
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  ተበዳሪ አስፈላጊ የብድር ሰነዶችን ማሟላት የሚጀምረው የወረፋ ጊዜ ከተጠናቀቀ በኋላ ይሆናል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  ማንኛውም ተበዳሪ የግዜ ውል የሚዋዋለው የአሚጎስ ሰራተኞች ከገመቱ በኋላ ይሆናል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  የብድር አስፈላጊ ሰነዶች ካሟሉ በኋላ ለብድር ውል ዝግጅት /LOAN PROCESS/ ይደረጋል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  የብድር ውል የመጨረሻ ፊርማ እንዲሁም እግድ ከተጠናቀቀ በኋላ 15 ቀናት ለቼክ ፊርማ /LOAN
                  DISBURSMENT/ የሚውል ይሆናል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  በቀሪ ገቢ ለሚደረግ የገንዘብ መጠን ላይ በተሰጠ የቀጠሮ ቀን ልክ የብድር ወረፋ ላይ ጭማሪ
                  የሚደረግ ይሆናል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  አመታዊ ኢንሹራንስ ክፍያው 0.5% ከአባሉ አጠቃላይ ተቀማጭ ሒሳብ (አክሲዎን መደበኛ ቁጠባ፣
                  ፍቃደኝነት ቁጠባ) በአመት አንዴ ተቀናሽ ይሆናል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={Styles.text}> በብድር ጥያቄው ላይ የተሰጠ ማብራርያ </Text>
              </View>

              <View style={RequestFormStyles.fullfreebox}></View>
              <View style={RequestFormStyles.fullbox}>
                <Text style={RequestFormStyles.textCenter}>
                  ማህበሩ በማንኛውም ሰአት ማንኛውም ማሻሻያ ሊያደርግ ይችላል፡፡ ይህም በማንኛውም አባል ላይ
                  ተፈጻሚነት ይኖረዋል፡፡
                </Text>
              </View>
              <View style={RequestFormStyles.fullfreebox}>
                <Btable
                  zid=""
                  zkey="ቅጹን ያስሞላችው፡ ሰምሀል የኋላሸት"
                  zvalue=""
                />
              </View>
            </>
          ) : (
            <></>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default RequestFormDoc;
