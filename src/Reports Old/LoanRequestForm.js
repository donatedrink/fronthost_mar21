import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Document, Font, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Header from './Header';
import EtCurrency from '../../common/modules/currency';

import AmharicFont from './font/ebrima.ttf';
import ReportStyles from './ReportStyles';
import BottomTableReusable from './BottomTableReusable';
import BottomTableReusableSameWidth from './BottomTableReusableSameWidth';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Styles = StyleSheet.create({
  text: {
    marginTop: 1,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'AmharicFont',
    fontWeight: 'bold',
    color: 'red'
  }
});

Font.register({
  family: 'AmharicFont',
  src: AmharicFont
});

const Subtitle = ({ children, ...props }) => (
  <Text style={ReportStyles.subtitle} {...props}>
    {children}
  </Text>
);

function LoanRequestForm() {
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
    <PDFViewer style={{ width: '100%', height: 700 }}>
      <Document title="Loan Agreement">
        <Page style={ReportStyles.body} wrap>
          <Header />
          {Object.keys(loan).length > 0 ? (
            <>
              <Text style={ReportStyles.space}></Text>
              {/* <Text style={ReportStyles.author}> የብድር መጠየቅያ ቅጽ </Text> */}
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.text}>ጥያቄው የቀረበበት ፕሮጀክት ቁጥር {loan.loanId}</Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.text}> </Text>
              </View>

              <BottomTableReusable zid="1" zkey="ሙሉ ስም" zvalue={customer.amDisplayName} />
              <BottomTableReusable zid="2" zkey="መለያ ቁጥር" zvalue={customer.entityExternalId} />
              <BottomTableReusable zid="3" zkey="አድራሻ/ስልክ" zvalue={customer.amAddress + '/' + customer.mobileNo} />
              <BottomTableReusable zid="4" zkey="ፆታ" zvalue={customer.gender} />
              <BottomTableReusable zid="5" zkey="አባል የሆኑበት ቀን (DD/MM/YY)" zvalue={customer.memberSince} />
              <BottomTableReusable
                zid="6"
                zkey="ጥያቄው የቀረበበት ቀን (DD/MM/YY) በሃበሻ እና በፈረንጅ"
                zvalue={loan.submittedOnDate}
              />
              <BottomTableReusable zid="7" zkey="የብድር አይነት" zvalue={loan.loantype} />
              <BottomTableReusable zid="8" zkey="የዋስትና አይነት" />
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
              <BottomTableReusable
                zid="11"
                zkey="አሁን ያላቸው የቁጠባ መጠን/መደበኛ + አክስዮን/"
                zvalue={Number(Number(loan.totalSaving) + Number(loan.totalShares)).toLocaleString('am-ET', EtCurrency)}
              />
              <BottomTableReusable zid="12" zkey="ብድሩ የሚወሰድበት የብዜት መጠን" zvalue={loan.multiplier} />
              <BottomTableReusable
                zid="13"
                zkey="የሚደርሰው ብድር መጠን"
                bgcolor="orange"
                textalign="center"
                zvalue={Number(loan.approvedPrincipalDisbursed.toFixed(2)).toLocaleString('am-ET', EtCurrency)}
              />
              <BottomTableReusable zid="14" zkey="የአግልግሎት ክፍያ መጠን %" zvalue={loan.prcntServiceCharge + ' %'} />
              <BottomTableReusable zid="15" zkey="የብድር ዋስትና (ኢንሹራንስ)" zvalue={loan.prcntLifeInsurance + ' %'} />
              <BottomTableReusable zid="16" zkey="የአግልግሎት ክፍያ + የብድር ዋስትና ብር" />
              <BottomTableReusable zid="17" zkey="ብደሩን የሚወስዱበት የወለድ መጠን (%)" zvalue={loan.annualInterestRate + ' %'} />
              <BottomTableReusable zid="18" zkey="ብድሩ የሚመለስበት አመት" zvalue={loan.numberOfRepayments / 12 + ' ኣመት'} />
              <BottomTableReusable zid="19" zkey="ወርሃዊ ክፍያ" zvalue={loan.totalDueForPeriod} />
              <BottomTableReusable zid="20" zkey="ጠቅላላ የወለድ ክፍያ" zvalue={loan.totalInterestPayment} />
              <BottomTableReusable zid="21" zkey="የወረፋ ጊዜ" zvalue={loan.queueTime} />
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>ተበዳሪ አስፈላጊ የብድር ሰነዶችን ማሟላት የሚጀምረው የወረፋ ጊዜ ከተጠናቀቀ በኋላ ይሆናል፡፡</Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>ማንኛውም ተበዳሪ የግዜ ውል የሚዋዋለው የአሚጎስ ሰራተኞች ከገመቱ በኋላ ይሆናል፡፡</Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>የብድር አስፈላጊ ሰነዶች ካሟሉ በኋላ ለብድር ውል ዝግጅት /LOAN PROCESS/ ይደረጋል፡፡</Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>
                  የብድር ውል የመጨረሻ ፊርማ እንዲሁም እግድ ከተጠናቀቀ በኋላ 15 ቀናት ለቼክ ፊርማ /LOAN DISBURSMENT/ የሚውል ይሆናል፡፡
                </Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>
                  በቀሪ ገቢ ለሚደረግ የገንዘብ መጠን ላይ በተሰጠ የቀጠሮ ቀን ልክ የብድር ወረፋ ላይ ጭማሪ የሚደረግ ይሆናል፡፡
                </Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>
                  አመታዊ ኢንሹራንስ ክፍያው 0.5% ከአባሉ አጠቃላይ ተቀማጭ ሒሳብ (አክሲዎን መደበኛ ቁጠባ፣ ፍቃደኝነት ቁጠባ) በአመት አንዴ ተቀናሽ ይሆናል፡፡
                </Text>
              </View>
              <View style={ReportStyles.fullbox}>
                <Text style={Styles.text}> በብድር ጥያቄው ላይ የተሰጠ ማብራርያ </Text>
              </View>

              <View style={ReportStyles.fullfreebox}></View>
              <View style={ReportStyles.fullbox}>
                <Text style={ReportStyles.textCenter}>
                  ማህበሩ በማንኛውም ሰአት ማንኛውም ማሻሻያ ሊያደርግ ይችላል፡፡ ይህም በማንኛውም አባል ላይ ተፈጻሚነት ይኖረዋል፡፡
                </Text>
              </View>
              <View style={ReportStyles.fullfreebox}>
                <BottomTableReusableSameWidth  zid="" zkey="ቅጹን ያስሞላችው፡ ሰምሀል የኋላሸት" zvalue=""  />
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

export default LoanRequestForm;
